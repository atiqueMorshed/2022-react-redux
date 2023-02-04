import apiSlice from "../api/apiSlice";
import { isValidSenderOrReceiverType } from "../messages/messages.type";
import messagesApi from "../messages/messagesApi";
import { EmailType } from "../types";
import {
	ConversationType,
	ConversationsType,
	ReceivedConversationType,
	iPropsAddConversation,
	iPropsEditConversation,
	iPropsGetConversation,
} from "./conversations.type";

const conversationsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query<ConversationsType, EmailType>({
			query: (email) =>
				`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
		}),

		getConversation: builder.query<
			ReceivedConversationType | [],
			iPropsGetConversation
		>({
			query: ({ userEmail, participantEmail }) =>
				`/conversations?participants=${userEmail}-${participantEmail}&&participants=${participantEmail}-${userEmail}`,
		}),

		addConversation: builder.mutation<ConversationType, iPropsAddConversation>({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			query: ({ senderEmail, data }) => ({
				url: "/conversations",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				const response = await queryFulfilled;
				const { id, users, message, timestamp } = response.data;

				const sender = users.find((u) => u.email === args.senderEmail);
				const receiver = users.find((u) => u.email !== args.senderEmail);

				if (
					isValidSenderOrReceiverType(sender) &&
					isValidSenderOrReceiverType(receiver)
				) {
					setTimeout(() => {
						dispatch(
							messagesApi.endpoints.addMessage.initiate({
								conversationId: id,
								sender,
								receiver,
								message,
								timestamp,
							}),
						);
					}, 5000);
				}
			},
		}),

		editConversation: builder.mutation<
			ConversationType,
			iPropsEditConversation
		>({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			query: ({ id, senderEmail, data }) => ({
				url: `/conversations/${id}`,
				method: "PATCH",
				body: data,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				const response = await queryFulfilled;
				const { id, users, message, timestamp } = response.data;

				const sender = users.find((u) => u.email === args.senderEmail);
				const receiver = users.find((u) => u.email !== args.senderEmail);

				if (
					isValidSenderOrReceiverType(sender) &&
					isValidSenderOrReceiverType(receiver)
				) {
					setTimeout(() => {
						dispatch(
							messagesApi.endpoints.addMessage.initiate({
								conversationId: id,
								sender,
								receiver,
								message,
								timestamp,
							}),
						);
					}, 5000);
				}
			},
		}),
	}),
});

export const {
	useGetConversationsQuery,
	useGetConversationQuery,
	useAddConversationMutation,
	useEditConversationMutation,
} = conversationsApi;

export default conversationsApi;
