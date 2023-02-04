import { EmailType } from "../types";

export type ConversationType = {
	id: number;
	participants: string;
	users: [
		{
			id: number;
			name: string;
			email: string;
		},
		{
			id: number;
			name: string;
			email: string;
		},
	];
	message: string;
	timestamp: number;
};

export type ReceivedConversationType = [ConversationType];

export type iPropsGetConversation = {
	userEmail: EmailType;
	participantEmail: EmailType;
};

export type iPropsEditConversation = {
	id: number | string;
	data: Partial<Omit<ConversationType, "id">>;
	senderEmail: EmailType;
};
export type iPropsAddConversation = {
	data: Omit<ConversationType, "id">;
	senderEmail: EmailType;
};

export type ConversationsType = ConversationType[];

export const isValidConversationType = (
	conv: unknown,
): conv is ConversationType => {
	if (
		conv !== null &&
		typeof conv === "object" &&
		"id" in conv &&
		"participants" in conv
	)
		return true;
	return false;
};

export const isValidReceivedConversationType = (
	conv: unknown,
): conv is ReceivedConversationType => {
	if (Array.isArray(conv) && isValidConversationType(conv)) return true;
	return false;
};
