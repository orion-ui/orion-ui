import { nextTick, reactive, ref, watch } from 'vue';
import { ChatService } from 'services/ChatService';
import { isMac } from 'utils/tools';
import usePluralize from 'services/PluralizeService';
import useMonkey from 'services/MonkeyService';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionChatEmits = {(e: 'new-message', payload: Orion.Chat.NewMessage): void;}
export type OrionChatProps = {
	// @doc props/chat instance of the chat service
	// @doc/fr props/chat instance du service `chat`
	chat: ChatService,
	// @doc props/discussionId id of the discussion
	// @doc/fr props/discussionId id de la discussion
	discussionId: number,
	// @doc props/focusOnOpen focused the input field chat the chat opens
	// @doc/fr props/focusOnOpen place le focus sur la zone de texte quand le chat s'ouvre
	focusOnOpen: boolean,
	// @doc props/hideSearch hides the research field on the top of the chat
	// @doc/fr props/hideSearch masque le champ de recherche en haut du chat
	hideSearch: boolean,
};

export default class OrionChatSetupService extends SharedSetupService {
	static readonly defaultProps = {
		chat: undefined,
		discussionId: undefined,
		focusOnOpen: false,
		hideSearch: false,
	};

	private observer = null as Nullable<IntersectionObserver>;

	private state = reactive({
		preventScroll: false,
		isLoading: false,
		searchTerm: undefined as Undef<string>,
		unreadTop: 0,
		unreadBottom: 0,
		newMessage: null as Nullable<string>,
		showSearch: false,
	});

	_input = ref<OrionTextarea>();
	_content = ref<RefDom>();
	_lazyLoader = ref<RefDom>();
	_sectionsWrapper = ref<RefDom>();
	_search = ref<RefDom>();

	get chat () { return this.props.chat; }
	get discussion () { return this.chat.getDiscussion(this.props.discussionId); }
	get hideSearch () { return this.props.hideSearch; }
	get showSearch () { return this.state.showSearch; }
	get unreadMessageLabel () { return usePluralize(this.lang.ORION_CHAT__UNREAD_MESSAGE, this.state.unreadTop, true); }
	get newMessageLabel () { return usePluralize(this.lang.ORION_CHAT__NEW_MESSAGE, this.state.unreadBottom, true); }
	get unreadTop () { return this.state.unreadTop; }
	get unreadBottom () { return this.state.unreadBottom; }
	get isLoading () { return this.state.isLoading; }

	get textareaLabel () {
		return this._input.value?.isFocus()
			? this.sendTooltip
			: this.lang.ORION_CHAT__NEW_MESSAGE;
	}

	get showLazyLoader () {
		return !this.discussion
			? false
			: !this.discussion.fullyLoaded;
	}

	get sendTooltip () {
		return isMac()
			? `⌘ + ${this.lang.ORION_CHAT__ENTER_TO_SEND}`
			: `CTRL + ${this.lang.ORION_CHAT__ENTER_TO_SEND}`;
	}

	get searchTerm () { return this.state.searchTerm; }
	set searchTerm (val) { this.state.searchTerm = val; }

	get newMessage () { return this.state.newMessage; }
	set newMessage (val) { this.state.newMessage = val; }

	get publicInstance () {
		return {
			...super.publicInstance,
			checkUnreadMessagesInDom: this.checkUnreadMessagesInDom.bind(this),
			getDiscussionId: () => this.discussion?.id,
		};
	}


	constructor (protected props: OrionChatProps, protected emits: OrionChatEmits) {
		super();


		watch(() => this.props.discussionId, () => {
			nextTick(() => {
				this.scrollToBottom();
				this.fetchMessagesAsync();

				if (this.props.focusOnOpen) {
					this._input.value?.focus();
				}
			});
		});
	}

	async onMounted () {
		// Init observer to mark messages as read when scroll into view
		this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), {
			root: this._content.value,
			threshold: 0,
		});

		this.chat.bus.on('message-added', (discussionId: number) => {
			if (discussionId === this.props.discussionId) this.handleMessageAdded();
		});

		await this.fetchMessagesAsync();

		if (this.props.focusOnOpen) {
			this._input.value?.focus();
		}
	}


	getSectionTitle (date: number) {
		return useMonkey(new Date(Number(date))).toReadable();
	}

	private async fetchMessagesAsync () {
		const discussion = this.discussion;
		if (!discussion) return;

		this.state.isLoading = true;

		if (!discussion.messages.length || !discussion.initialLoad) {
			await this.discussion?.fetchMessagesAsync();
			discussion.initialLoad = true;
		}

		await this.resetIntersectionObserver();
		this.scrollToLastRead();
		await this.checkUnreadMessagesInDom();
		this.state.isLoading = false;
	};

	private initIntersectionObserver () {
		const messages = this._content.value?.querySelectorAll('.orion-chat-message--is-unread.orion-chat-message--from-interlocutor');
		if (messages?.length) {
			[...messages].forEach((el) => {
				this.observer?.observe(el);
			});
		}

		const lazyLoader = this._lazyLoader.value;
		if (lazyLoader) this.observer?.observe(lazyLoader);
	};

	private intersectionObserverCallback (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
		entries.forEach(async (x) => {
			if (x.isIntersecting) {
				if (x.target.classList.contains('orion-chat__lazy-loader')) {
					if (typeof this.chat.config.messageFetcherAsync === 'function') {
						this.state.preventScroll = true;

						const currentHeight = this._content.value?.scrollHeight ?? 0;
						const currentScroll = this._content.value?.scrollTop ?? 0;

						await this.chat.fetchMessagesAsync(this.props.discussionId);

						nextTick(() => {
							setTimeout(() => {
								const newHeight = this._content.value?.scrollHeight ?? 0;
								const targetScroll = currentScroll + (newHeight - currentHeight) - (this._content.value?.offsetHeight ?? 0) / 3;
								this._content.value?.scrollTo({ top: targetScroll });
								this.state.preventScroll = false;
								this.initIntersectionObserver();
							}, 100);
						});
					}
				} else {
					const target = x.target as HTMLElement;
					const messageId = Number(target.dataset.chatMessageId);

					setTimeout(() => { // timeout for better UX
						this.chat.setMessageRead(this.props.discussionId, messageId);
						observer.unobserve(target);
						this.checkUnreadMessagesInDom();
					}, 600);
				}
			}
		});
	};

	private resetIntersectionObserver () {
		return new Promise((resolve) => {
			this.observer?.disconnect();
			nextTick(() => {
				this.initIntersectionObserver();
				resolve(true);
			});
		});
	};

	private scrollToLastRead () {
		if (this.state.preventScroll) return;

		const firstUnread = this._content.value
			?.querySelectorAll('.orion-chat-message--is-unread.orion-chat-message--from-interlocutor')
			.item(0) as HTMLElement;


		if (firstUnread) {
			this._content.value?.scrollTo({
				top: firstUnread.offsetTop - 90,
				left: 0,
				// behavior: 'smooth',
			});
		} else {
			this.scrollToBottom();
		}
	};

	private scrollToBottom (smooth = false) {
		if (this.state.preventScroll) return;

		const content = this._content.value;
		const sectionsWrapper = this._sectionsWrapper.value;

		if (content && sectionsWrapper) {
			nextTick(() => {
				content.scrollTo({
					top: sectionsWrapper.offsetHeight,
					left: 0,
					behavior: smooth ? 'smooth' : 'auto',
				});
			});
		}
	};

	private checkIfShouldScroll () {
		const domContent = this._content.value;
		return domContent && (domContent.offsetHeight + domContent.scrollTop) > (domContent.scrollHeight - 30);
	};

	async sendNewMessageAsync () {
		if (this.state.newMessage && this.discussion) {
			const { discussion } = this;
			const message = this.state.newMessage;

			this.state.newMessage = null;

			const shouldScroll = this.checkIfShouldScroll();

			await discussion.addNewMessageAsync(message);

			this.emits('new-message', {
				message: message,
				discussionId: discussion.id,
			});

			if (shouldScroll) this.scrollToLastRead();
		}
	};

	toggleSearch () {
		if (this.state.showSearch) {
			this.state.showSearch = false;
			this.searchTerm = undefined;
		} else {
			this.state.showSearch = true;
			nextTick(() => {
				this._search.value?.focus();
			});
		}
	};

	handleSearchBlur () {
		if (!this.searchTerm?.trim().length) {
			this.toggleSearch();
		}
	};

	private handleMessageAdded () {
		this.resetIntersectionObserver();

		if (this.checkIfShouldScroll()) this.scrollToLastRead();

		this.checkUnreadMessagesInDom();
	};

	private checkUnreadMessagesInDom () {
		return new Promise<void>((resolve) => {
			nextTick(() => {
				if (this.discussion?.unreadMessagesCount === 0) {
					this.state.unreadBottom = 0;
					this.state.unreadTop = 0;
					resolve();
					return;
				}

				const content = this._content.value;
				const sectionsWrapper = this._sectionsWrapper.value;
				if (!content || !sectionsWrapper) {
					this.state.unreadBottom = 0;
					resolve();
					return;
				}

				const offset = 30;
				const { bottom: contentBottom, top: contentTop } = content.getBoundingClientRect();

				this.state.unreadBottom = Array.from(sectionsWrapper.querySelectorAll('.orion-chat-message--from-interlocutor.orion-chat-message--is-unread'))
					.filter((el) => {
						const { top } = el.getBoundingClientRect();
						return top > contentBottom - offset;
					})
					.length;

				const unreadInArea = Array.from(sectionsWrapper.querySelectorAll('.orion-chat-message--from-interlocutor.orion-chat-message--is-unread'))
					.filter((el) => {
						const { top, bottom } = el.getBoundingClientRect();
						return top <= contentBottom - offset && top >= contentTop - offset
							&& bottom <= contentBottom + offset && bottom >= contentTop + offset;
					})
					.length;

				this.state.unreadTop = (this.discussion?.unreadMessagesCount ?? 0) - unreadInArea - this.state.unreadBottom;
				resolve();
			});
		});
	};
}

