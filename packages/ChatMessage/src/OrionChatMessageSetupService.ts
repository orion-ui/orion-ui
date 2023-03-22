import { PropType } from 'vue';
import OrionChatEntity from 'packages/Chat/src/OrionChatEntity';
import SharedSetupService from '../../Shared/SharedSetupService';
import OrionChatMessageEntity from './OrionChatMessageEntity';
import { ChatService } from 'services/ChatService';

type Props = SetupProps<typeof OrionChatMessageSetupService.props>

export default class OrionChatMessageSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/message message object
		// @doc/fr props/message Objet représentant le message
		message: {
			type: Object as PropType<OrionChatMessageEntity>,
			required: true as const,
		},
		// @doc props/discussion the discussion related to the message
		// @doc/fr props/discussion discussion relative au message
		discussion: {
			type: Object as PropType<OrionChatEntity>,
			required: true as const,
		},
		// @doc props/chat instance of the chat
		// @doc/fr props/chat instance du service `chat`
		chat: {
			type: Object as PropType<ChatService>,
			required: true as const,
		},
	};

	get message () {
		return this.props.message;
	}

	get messageStatusEnabled () {
		return this.props.chat.config.allowMessageStatus;
	}


	constructor (props: Props) {
		super(props);
	}
}
