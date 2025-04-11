import OrionChatEntity from '../../Chat/src/OrionChatEntity';
import SharedSetupService from '../../Shared/SharedSetupService';
import OrionChatMessageEntity from './OrionChatMessageEntity';
import { ChatService } from '../../../services/ChatService';

export type OrionChatMessageEmits = {}
export type OrionChatMessageProps = {
	// @doc props/chat instance of the chat
	// @doc/fr props/chat instance du service `chat`
	chat: ChatService,
	// @doc props/discussion the discussion related to the message
	// @doc/fr props/discussion discussion relative au message
	discussion: OrionChatEntity,
	// @doc props/message message object
	// @doc/fr props/message Objet représentant le message
	message: OrionChatMessageEntity,
};

export default class OrionChatMessageSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	get message () {
		return this.props.message;
	}

	get messageStatusEnabled () {
		return this.props.chat.config.allowMessageStatus;
	}

	constructor (protected props: OrionChatMessageProps, protected emits: OrionChatMessageEmits) {
		super();
	}
}
