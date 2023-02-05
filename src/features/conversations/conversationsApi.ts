import apiSlice from "../api/apiSlice";
import {
	isValidMessageType,
	isValidSenderOrReceiverType,
} from "../messages/messages.type";
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
				try {
					const response = await queryFulfilled;
					const { id, users, message, timestamp } = response.data;

					// Updates the conversations list by adding the new conversation to the Conversations list
					// Pessimistic cache update start
					console.log("01");
					dispatch(
						conversationsApi.util.updateQueryData(
							"getConversations",
							args.senderEmail,
							(draft) => {
								draft.push(response.data);
							},
						),
					);
					// Pessimistic cache update end

					const sender = users.find((u) => u.email === args.senderEmail);
					const receiver = users.find((u) => u.email !== args.senderEmail);

					if (
						isValidSenderOrReceiverType(sender) &&
						isValidSenderOrReceiverType(receiver)
					) {
						const handleDispatch = async () => {
							const response = await dispatch(
								messagesApi.endpoints.addMessage.initiate({
									conversationId: id,
									sender,
									receiver,
									message,
									timestamp,
								}),
							).unwrap();
							// Updates the Messages list by adding the new message to Messages List
							// Pessimistic cache update start
							if (isValidMessageType(response)) {
								console.log("02");
								dispatch(
									messagesApi.util.updateQueryData(
										"getMessages",
										response.conversationId.toString(),
										(draft) => {
											draft.push(response);
										},
									),
								);
							}
							// Pessimistic cache update end
						};
						setTimeout(() => {
							handleDispatch();
						}, 500);
					}
				} catch (err: unknown) {
					//
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
				// Optimistic cache update start

				const patchResultGetConversation = dispatch(
					conversationsApi.util.updateQueryData(
						"getConversations",
						args.senderEmail,
						(draft) => {
							const draftConversation = draft.find((c) => c.id == args.id);

							(draftConversation as ConversationType).message =
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								args.data.message!;
							(draftConversation as ConversationType).timestamp =
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								args.data.timestamp!;
						},
					),
				);
				// Optimistic cache update end

				try {
					const response = await queryFulfilled;
					const { id, users, message, timestamp } = response.data;

					const sender = users.find((u) => u.email === args.senderEmail);
					const receiver = users.find((u) => u.email !== args.senderEmail);

					if (
						isValidSenderOrReceiverType(sender) &&
						isValidSenderOrReceiverType(receiver)
					) {
						const handleDispatch = async () => {
							const response = await dispatch(
								messagesApi.endpoints.addMessage.initiate({
									conversationId: id,
									sender,
									receiver,
									message,
									timestamp,
								}),
							).unwrap();

							if (isValidMessageType(response)) {
								// Pessimistic cache update start
								dispatch(
									messagesApi.util.updateQueryData(
										"getMessages",
										response.conversationId.toString(),
										(draft) => {
											draft.push(response);
										},
									),
								);
								// Pessimistic cache update end
							}
						};

						// This delay is required because json-server throws an error if there is no delay between requests.
						setTimeout(() => {
							handleDispatch();
						}, 500);
					}
				} catch (err: unknown) {
					// Optimistic cache  update UNDO on error
					patchResultGetConversation.undo();
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
