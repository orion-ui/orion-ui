import { nextTick, PropType, reactive, ref, watch } from 'vue';
import { ChatService } from 'services/ChatService';
import { isMac } from 'utils/tools';
import usePluralize from 'services/PluralizeService';
import useMonkey from 'services/MonkeyService';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionChatSetupService.props>

type ChatEmit = {
  (e: 'new-message', payload: Orion.ChatNewMessage): void;
}

export default class OrionChatSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/hideSearch hides the research field on the top of the chat
		// @doc/fr props/hideSearch masque le champ de recherche en haut du chat
		hideSearch: Boolean,
		// @doc props/focusOnOpen focused the input field chat the chat opens
		// @doc/fr props/focusOnOpen place le focus sur la zone de texte quand le chat s'ouvre
		focusOnOpen: Boolean,
		// @doc props/chat instance of the chat service
		// @doc/fr props/chat instance du service `chat`
		chat: {
			type: Object as PropType<ChatService>,
			required: true as const,
		},
		// @doc props/discussionId id of the discussion
		// @doc/fr props/discussionId id de la discussion
		discussionId: {
			type: Number,
			required: true as const,
		},
	};

	private observer = null as Nullable<IntersectionObserver>;
	protected emit: ChatEmit;
	private state = reactive({
		lazyLoader: false,
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

	get lazyLoader () { return this.state.lazyLoader; }
	set lazyLoader (val) { this.state.lazyLoader = val; }

	get preventScroll () { return this.state.preventScroll; }
	set preventScroll (val) { this.state.preventScroll = val; }

	get isLoading () { return this.state.isLoading; }
	set isLoading (val) { this.state.isLoading = val; }

	get newMessage () { return this.state.newMessage; }
	set newMessage (val) { this.state.newMessage = val; }


	constructor (props: Props, emit: ChatEmit) {
		super(props);
		this.emit = emit;

		watch(() => this.props.discussionId, () => {
			nextTick(() => {
				this.scrollToBottom();
				this.fetchMessages();

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

		await this.fetchMessages();

		if (this.props.focusOnOpen) {
			this._input.value?.focus();
		}
	}


	getSectionTitle (date: number) {
		return useMonkey(new Date(Number(date))).toReadable();
	}

	async fetchMessages () {
		const discussion = this.discussion;
		if (!discussion) return;

		this.isLoading = true;

		if (!discussion.messages.length || !discussion.initialLoad) {
			await this.discussion?.fetchMessagesAsync();
			discussion.initialLoad = true;
		}

		await this.resetIntersectionObserver();
		this.scrollToLastRead();
		await this.checkUnreadMessagesInDom();
		this.isLoading = false;
	};

	initIntersectionObserver () {
		const messages = this._content.value?.querySelectorAll('.orion-chat-message--is-unread.orion-chat-message--from-interlocutor');
		if (messages?.length) {
			[...messages].forEach((el) => {
				this.observer?.observe(el);
			});
		}

		const lazyLoader = this._lazyLoader.value;
		if (lazyLoader) this.observer?.observe(lazyLoader);
	};

	intersectionObserverCallback (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
		entries.forEach(async (x) => {
			if (x.isIntersecting) {
				if (x.target.classList.contains('orion-chat__lazy-loader')) {
					if (typeof this.chat.config.messageFetcher === 'function') {
						this.lazyLoader = true;
						this.preventScroll = true;

						const currentHeight = this._content.value?.scrollHeight ?? 0;
						const currentScroll = this._content.value?.scrollTop ?? 0;

						await this.chat.fetchMessages(this.props.discussionId);

						nextTick(() => {
							const newHeight = this._content.value?.scrollHeight ?? 0;
							const targetScroll = currentScroll + (newHeight - currentHeight) - (this._lazyLoader.value?.offsetHeight ?? 0);
							this._content.value?.scrollTo({ top: targetScroll });

							setTimeout(() => {
								this.lazyLoader = false;
								this.preventScroll = false;
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

	resetIntersectionObserver () {
		return new Promise((resolve) => {
			this.observer?.disconnect();
			nextTick(() => {
				this.initIntersectionObserver();
				resolve(true);
			});
		});
	};

	scrollToLastRead () {
		if (this.preventScroll) return;

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

	scrollToBottom (smooth = false) {
		if (this.preventScroll) return;

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

	checkIfShouldScroll () {
		const domContent = this._content.value;
		if (domContent && (domContent.offsetHeight + domContent.scrollTop) > (domContent.scrollHeight - 30)) {
			this.scrollToLastRead();
		}
	};

	sendNewMessage () {
		if (this.state.newMessage && this.discussion) {
			this.discussion?.addNewMessage(this.state.newMessage);
			this.emit('new-message', {
				message: this.state.newMessage,
				discussionId: this.discussion.id,
			});
			this.checkIfShouldScroll();
			this.newMessage = null;
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

	handleMessageAdded () {
		this.resetIntersectionObserver();
		this.checkIfShouldScroll();
		this.checkUnreadMessagesInDom();
	};

	checkUnreadMessagesInDom () {
		return new Promise((resolve) => {
			nextTick(() => {
				const content = this._content.value;
				const sectionsWrapper = this._sectionsWrapper.value;
				if (!content || !sectionsWrapper) {
					this.state.unreadBottom = 0;
					resolve(true);
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
				resolve(true);
			});
		});
	};
}

