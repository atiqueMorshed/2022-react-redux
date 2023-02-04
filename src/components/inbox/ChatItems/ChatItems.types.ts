import { ConversationsType } from "../../../features/conversations/conversations.type";

export const isValidConversations = (
	conv: unknown,
): conv is ConversationsType => {
	return (
		Array.isArray(conv) &&
		conv?.length > 0 &&
		typeof conv[0] === "object" &&
		"id" in conv[0]
	);
};
