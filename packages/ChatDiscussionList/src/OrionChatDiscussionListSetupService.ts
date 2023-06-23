import { ChatService } from 'services/ChatService';
import { nextTick, PropType, reactive, ref, watch } from 'vue';
import useMonkey from 'services/MonkeyService';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionChatDiscussionListSetupService.props>
type Emits = {
	(e: 'new-discussion'): void;
	(e: 'select-discussion', payload: number): void;
}

export default class OrionChatDiscussionListSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/chat instance of the chat service
		// @doc/fr props/chat instance du service `chat`
		chat: {
			type: Object as PropType<ChatService>,
			required: true as const,
		},
	};

	private intersectionObserver = undefined as Undef<IntersectionObserver>;
	private emits: Emits;
	private state = reactive({
		searchTerm: undefined as Undef<string>,
		contentHasScroll: true,
	});

	_el = ref<RefDom>();
	_lazyLoader = ref<RefDom>();
	_content = ref<RefDom>();

	get searchTerm () { return this.state.searchTerm; }
	set searchTerm (val) { this.state.searchTerm = val; }

	get chat () {
		return this.props.chat;
	}

	get discussions () {
		return [...this.chat.discussions]
			.filter(x => this.searchTerm && !this.chat.config.discussionFetcherAsync ? x.title.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
			.sort((a, b) => b.lastMessage && a.lastMessage
				? b.lastMessage.createdDate.valueOf() - a.lastMessage.createdDate.valueOf()
				: 0,
			);
	}

	get showLazyLoader () {
		if (!this.discussions.length || !this.chat.config.discussionFetcherAsync) return false;

		return !this.chat.discussionsFullyLoaded && this.state.contentHasScroll;
	}


	constructor (props: Props, emits: Emits) {
		super(props);
		this.emits = emits;

		watch(() => this.discussions.length, () => {
			setTimeout(this.checkContentScroll, 300);
		});

		watch(() => this.searchTerm, () => {
			this.fetchDiscussionsAsync(true);
		});
	}

	protected async onMounted () {
		if (this.chat.config.discussionFetcherAsync) {
			// Init intersectionObserver to mark messages as read when scroll into view
			this.intersectionObserver = new IntersectionObserver(
				this.intersectionObserverCallback.bind(this),
				{
					root: this._el.value,
					threshold: 1,
				});
			await this.fetchDiscussionsAsync();
			this.initObservers();
		}
	}


	async fetchDiscussionsAsync (searchTermHasChanged = false) {
		if (!this.chat.config.discussionFetcherAsync) return;

		await this.chat.fetchDiscussionsAsync(this.searchTerm, searchTermHasChanged);

		this.resetObservers();
	}

	intersectionObserverCallback (entries: IntersectionObserverEntry[]) {
		entries.forEach(async (x) => {
			if (x.isIntersecting && this.chat.config.discussionFetcherAsync) {
				this.fetchDiscussionsAsync();
			}
		});
	}

	initObservers () {
		const lazyLoader = this._lazyLoader.value;
		if (lazyLoader) this.intersectionObserver?.observe(lazyLoader);
	}

	resetObservers () {
		this.intersectionObserver?.disconnect();
		nextTick(() => {
			this.initObservers();
		});
	}

	checkContentScroll () {
		nextTick(() => {
			const discussionContentHeight = this._content?.value?.offsetHeight ?? 0;
			const discussionContentScrollHeight = this._content?.value?.scrollHeight ?? 0;
			const lazyLoaderHeight = this._lazyLoader?.value?.offsetHeight;

			if (lazyLoaderHeight)
				this.state.contentHasScroll = (discussionContentScrollHeight - discussionContentHeight) > lazyLoaderHeight;
		});
	}

	formatLastMessageDateTime (date: Date) {
		if (date.valueOf() < useMonkey(new Date()).toMidnight().valueOf()) {
			return useMonkey(date).toReadable();
		} else {
			return useMonkey(date).toReadable('$hh:$mm');
		}
	}

	selectDiscussion (id: number) {
		this.chat.activeDiscussionId = id;
		this.emits('select-discussion', id);
		this.chat.bus.emit('select-discussion', id);
	}

	createNewDiscussion () {
		this.emits('new-discussion');
		this.chat.bus.emit('new-discussion');
	}
}
