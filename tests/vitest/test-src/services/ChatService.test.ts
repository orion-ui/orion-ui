import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import mitt from 'mitt';
import useMonkey from '../../../../services/MonkeyService';
import { getUid } from '../../../../utils/tools';

vi.mock('mitt', () => ({
	default: vi.fn().mockImplementation(() => ({
		emit: vi.fn(),
		on: vi.fn(),
		off: vi.fn(),
	})),
}));

vi.mock('../../../../utils/tools', () => ({
	getUid: vi.fn(),
}));

vi.mock('../../../../services/MonkeyService');

vi.mock('../../../../packages/Chat/src/OrionChatEntity');
vi.mock('../../../../packages/ChatMessage/src/OrionChatMessageEntity');

import { ChatService } from '../../../../services/ChatService';
import OrionChatEntity from '../../../../packages/Chat/src/OrionChatEntity';
import OrionChatMessageEntity from '../../../../packages/ChatMessage/src/OrionChatMessageEntity';


describe('ChatService', () => {
	let chatService: ChatService;
	const mockUser = { id: 1, name: 'Test User' };
	const mockDiscussionFetcher = vi.fn();
	const mockMessageFetcher = vi.fn();
	const mockOnNewMessage = vi.fn(async (message, callback) => callback());
	const mockOnMessageRead = vi.fn();
	const mockOnActiveDiscussionChange = vi.fn();

	const mockBus = mitt() as { emit: Mock };

	beforeEach(() => {
		vi.clearAllMocks();

		(getUid as Mock).mockImplementation(() => Date.now() + Math.random());
		(mitt as Mock).mockReturnValue(mockBus);

		(useMonkey as Mock).mockImplementation((arr: any[]) => ({
			mapKey: vi.fn((key = 'id') => arr.map(item => item[key])),
			first: vi.fn(() => arr[0]),
		}));

		(OrionChatEntity as any).mockImplementation((d: any, s: any) => ({
			messages: [],
			hidden: false,
			fullyLoaded: false,
			...d,
			id: d.id,
			service: s,
			registerChatMessageEntity: vi.fn(function (this: any, bubble) { this.messages.push(bubble); }),
			getMessageEntity: vi.fn(function (this: any, messageId) { return this.messages.find((m: any) => m.id === messageId); }),
			setLastMessage: vi.fn(),
			setLastMessageFromRegistered: vi.fn(),
		}));

		(OrionChatMessageEntity as any).mockImplementation((m: any, d: any) => {
			const messageInstance = {
				...m,
				discussion: d,
				read: vi.fn(function (this: any) { this.isRead = true; }),
			};
			d.registerChatMessageEntity(messageInstance);
			return messageInstance;
		});

		chatService = new ChatService({
			user: mockUser,
			discussionFetcherAsync: mockDiscussionFetcher,
			messageFetcherAsync: mockMessageFetcher,
			onNewMessageAsync: mockOnNewMessage,
			onMessageReadAsync: mockOnMessageRead,
			onActiveDiscussionChange: mockOnActiveDiscussionChange,
		});
	});

	describe('Initialization and State', () => {
		it('should initialize with default and custom configurations', () => {
			expect(chatService.config.user).toEqual(mockUser);
			expect(chatService.config.allowDiscussionSearch).toBe(true);
			expect(chatService.config.discussionFetcherAsync).toBe(mockDiscussionFetcher);
		});

		it('should get and set activeDiscussionId and trigger callback', () => {
			expect(chatService.activeDiscussionId).toBeUndefined();
			chatService.activeDiscussionId = 123;
			expect(chatService.activeDiscussionId).toBe(123);
			expect(mockOnActiveDiscussionChange).toHaveBeenCalledWith(123, undefined);
		});

		it('should return the correct userId', () => {
			expect(chatService.userId).toBe(mockUser.id);
		});

		it('should return discussions that are not hidden', () => {
			const discussion1 = { id: 1, hidden: false };
			const discussion2 = { id: 2, hidden: true };
			chatService.addDiscussion(discussion1 as any);
			chatService.addDiscussion(discussion2 as any);

			const visibleDiscussions = chatService.discussions;
			expect(visibleDiscussions).toHaveLength(1);
			expect(visibleDiscussions[0].id).toBe(1);
		});
	});

	describe('Discussions', () => {
		it('fetchDiscussionsAsync should add new discussions', async () => {
			const fetchedDiscussions = [{ id: 1 }, { id: 2 }];
			mockDiscussionFetcher.mockResolvedValue(fetchedDiscussions);

			await chatService.fetchDiscussionsAsync();

			expect(mockDiscussionFetcher).toHaveBeenCalled();
			expect(chatService.registry.size).toBe(2);
			expect(chatService.getDiscussion(1)).toBeDefined();
			expect(chatService.getDiscussion(2)).toBeDefined();
		});

		it('fetchDiscussionsAsync should handle search term changes', async () => {
			chatService.addDiscussion({ id: 1 } as any);
			const fetchedDiscussions = [{ id: 2 }];
			mockDiscussionFetcher.mockResolvedValue(fetchedDiscussions);

			await chatService.fetchDiscussionsAsync('search', true);

			const discussion1 = chatService.getDiscussion(1);
			const discussion2 = chatService.getDiscussion(2);

			expect(discussion1?.hidden).toBe(true);
			expect(discussion2).toBeDefined();
			expect(discussion2?.hidden).toBe(false);
		});

		it('getDiscussion should return the correct discussion entity', () => {
			const discussion = { id: 1 };
			chatService.addDiscussion(discussion as any);
			expect(chatService.getDiscussion(1)?.id).toBe(1);
		});

		it('deleteDiscussion should remove a discussion from the registry', () => {
			chatService.addDiscussion({ id: 1 } as any);
			expect(chatService.registry.has(1)).toBe(true);
			chatService.deleteDiscussion(1);
			expect(chatService.registry.has(1)).toBe(false);
		});

		it('getActiveDiscussion should return the active discussion', () => {
			chatService.addDiscussion({ id: 42 } as any);
			chatService.activeDiscussionId = 42;
			const active = chatService.getActiveDiscussion();
			expect(active).toBeDefined();
			expect(active?.id).toBe(42);
		});
	});

	describe('Messages', () => {
		beforeEach(() => {
			chatService.addDiscussion({ id: 10, messages: [] } as any);
		});

		it('fetchMessagesAsync should fetch and add messages for a discussion', async () => {
			const fetchedMessages = [{ id: 101, discussionId: 10 }, { id: 102, discussionId: 10 }];
			mockMessageFetcher.mockResolvedValue(fetchedMessages);

			const discussion = chatService.getDiscussion(10);
			if (!discussion) throw new Error('Discussion not found');

			await chatService.fetchMessagesAsync(10);

			expect(mockMessageFetcher).toHaveBeenCalledWith({
				discussion,
				discussionId: 10,
				oldestMessageId: undefined,
			});
			expect(OrionChatMessageEntity).toHaveBeenCalledTimes(2);
			expect(discussion.messages).toHaveLength(2);
		});

		it('fetchMessagesAsync should set discussion to fully loaded if no messages are returned', async () => {
			mockMessageFetcher.mockResolvedValue([]);
			const discussion = chatService.getDiscussion(10);

			await chatService.fetchMessagesAsync(10);

			expect(discussion?.fullyLoaded).toBe(true);
		});

		it('fetchMessagesAsync should not fetch if discussion is already fullyLoaded', async () => {
			const discussion = chatService.getDiscussion(10);
			if (discussion) discussion.fullyLoaded = true;

			await chatService.fetchMessagesAsync(10);
			expect(mockMessageFetcher).not.toHaveBeenCalled();
		});

		it('setMessageRead should mark a message as read and trigger callback', () => {
			const discussion = chatService.getDiscussion(10);
			const message = new (OrionChatMessageEntity as any)({ id: 101, isRead: false }, discussion);
			discussion?.messages.push(message);

			chatService.setMessageRead(10, 101);

			expect(message.read).toHaveBeenCalled();
			expect(mockOnMessageRead).toHaveBeenCalledWith(message);
		});

		it('addMessagesToDiscussions should add messages and emit event', () => {
			const messages = [
				{ id: 101, discussionId: 10 },
				{ id: 102, discussionId: 10 },
			];

			chatService.addMessagesToDiscussions(messages as any);
			const discussion = chatService.getDiscussion(10);

			expect(OrionChatMessageEntity).toHaveBeenCalledTimes(2);
			expect(discussion?.setLastMessageFromRegistered).toHaveBeenCalled();
			expect(mockBus.emit).toHaveBeenCalledWith('message-added', 10);
		});

		it('addNewMessageAsync should create a new message and trigger callbacks', async () => {
			const content = 'Hello world';
			(getUid as Mock).mockReturnValue(999);

			await chatService.addNewMessageAsync(10, content);

			expect(OrionChatMessageEntity).toHaveBeenCalledWith(
				expect.objectContaining({
					id: 999,
					discussionId: 10,
					content,
					author: mockUser,
				}),
				expect.any(Object),
				false,
			);

			expect(mockOnNewMessage).toHaveBeenCalled();
			const discussion = chatService.getDiscussion(10);
			expect(discussion?.registerChatMessageEntity).toHaveBeenCalled();
			expect(discussion?.setLastMessage).toHaveBeenCalled();
		});

		it('addNewMessageAsync should not add message if content is empty', async () => {
			await chatService.addNewMessageAsync(10, '   ');
			expect(mockOnNewMessage).not.toHaveBeenCalled();
		});
	});
});