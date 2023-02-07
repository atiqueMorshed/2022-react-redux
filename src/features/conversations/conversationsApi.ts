import { io } from "socket.io-client";
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
	ReceivedConversationsType,
	iPropsAddConversation,
	iPropsEditConversation,
	iPropsGetConversation,
} from "./conversations.type";

const conversationsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query<ReceivedConversationsType, EmailType>({
			query: (email) =>
				`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,

			transformResponse(responseData: ConversationsType, meta) {
				const totalConversationsCount =
					meta?.response?.headers.get("X-Total-Count");
				return {
					conversations: responseData,
					totalConversationsCount: totalConversationsCount
						? parseInt(totalConversationsCount)
						: -1,
				};
			},
			async onCacheEntryAdded(
				email,
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved },
			) {
				// Create the socket
				const socket = io(`${process.env.REACT_APP_API_URL}`, {
					reconnectionDelay: 1000,
					reconnection: true,
					reconnectionAttempts: 10,
					transports: ["websocket"],
					agent: false,
					upgrade: false,
					rejectUnauthorized: false,
				});

				try {
					await cacheDataLoaded;
					// Here, the first parameter is the name of the socket on server that we are listening for
					socket.on("conversations", (data: { data: ConversationType }) => {
						updateCachedData((draft) => {
							const conversationIndex = draft.conversations.findIndex(
								(c) => c.id == data.data.id,
							);

							if (conversationIndex !== -1) {
								draft.conversations[conversationIndex].message =
									data.data.message;
								draft.conversations[conversationIndex].timestamp =
									data.data.timestamp;
								const removedConversation = draft.conversations.splice(
									conversationIndex,
									1,
								);

								draft.conversations.unshift(...removedConversation);
							} else {
								// This means no conversation exists. So, we do nothing in this case.
								if (data.data.participants.includes(email)) {
									draft.conversations.unshift(data.data);
								}
							}
						});
					});
				} catch (err: unknown) {
					//
				}
				// awaiting cacheEntryRemove means the cache entry has been removed from the cache,
				// by not being used/subscribed to any more in the application for too long
				// or by dispatching api.util.resetApiState
				await cacheEntryRemoved;
				// In this case, we close our socket connection.
				socket.close();
			},
		}),
		getExtraConversationsOnScroll: builder.query<
			ConversationsType,
			{ email: EmailType; page: number }
		>({
			query: ({ email, page }) =>
				`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,

			async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
				try {
					const newConversations = await queryFulfilled;

					// Pessimistic cache update start
					if (newConversations?.data?.length > 0) {
						dispatch(
							conversationsApi.util.updateQueryData(
								"getConversations",
								email,
								(draft) => {
									draft.conversations = [
										...draft.conversations,
										...newConversations.data,
									];
								},
							),
						);
					}
					// Pessimistic cache update end
				} catch (err: unknown) {
					//
				}
			},
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
					const conversation = response.data || {};

					if ("id" in conversation) {
						const { id, users, message, timestamp } = conversation;
						const sender = users.find((u) => u.email === args.senderEmail);
						const receiver = users.find((u) => u.email !== args.senderEmail);

						if (
							isValidSenderOrReceiverType(sender) &&
							isValidSenderOrReceiverType(receiver)
						) {
							const handleDispatch = async () => {
								await dispatch(
									messagesApi.endpoints.addMessage.initiate({
										conversationId: id,
										sender,
										receiver,
										message,
										timestamp,
									}),
								);
							};
							setTimeout(() => {
								handleDispatch();
							}, 500);
						}
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
							const draftConversation = draft.conversations.find(
								(c) => c.id == args.id,
							);

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
