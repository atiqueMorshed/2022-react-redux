export type MessageType = {
	id: number;
	conversationId: number;
	sender: {
		email: string;
		name: string;
		id: number;
	};
	receiver: {
		email: string;
		name: string;
		id: number;
	};
	message: string;
	timestamp: number;
};

export type MessagesType = MessageType[];

export type SenderOrReceiverType = {
	email: string;
	name: string;
	id: number;
};

export const isValidMessageType = (
	message: unknown,
): message is MessageType => {
	if (message !== null && typeof message === "object" && "id" in message)
		return true;
	return false;
};

export const isValidMessagesType = (
	messages: unknown,
): messages is MessagesType => {
	if (
		messages !== null &&
		Array.isArray(messages) &&
		messages?.length > 0 &&
		isValidMessageType(messages[0])
	)
		return true;
	return false;
};

export const isValidSenderOrReceiverType = (
	user: unknown,
): user is SenderOrReceiverType => {
	if (user !== null && typeof user === "object" && "id" in user) return true;
	return false;
};
