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

export type SenderOrReceiverType = Pick<MessageType, "sender">;

export const isValidMessagesType = (
	messages: unknown,
): messages is MessagesType => {
	if (
		messages !== null &&
		Array.isArray(messages) &&
		messages?.length > 0 &&
		typeof messages[0] === "object"
	)
		return "id" in messages[0];
	return false;
};

export const isValidSenderOrReceiverType = (
	user: unknown,
): user is SenderOrReceiverType => {
	if (user !== null && typeof user === "object" && "id" in user) return true;
	return false;
};
