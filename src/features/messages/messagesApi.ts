import { io } from "socket.io-client";
import apiSlice from "../api/apiSlice";
import { MessageType, MessagesType } from "./messages.type";

const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query<MessagesType, string | number>({
			query: (id) =>
				`/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,

			async onCacheEntryAdded(
				args,
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved },
			) {
				const socket = io(`${process.env.REACT_APP_API_URL}`, {
					reconnectionDelay: 1000,
					reconnection: true,
					reconnectionAttempts: 10,
					agent: false,
					transports: ["websocket"],
					upgrade: false,
					rejectUnauthorized: false,
				});

				try {
					await cacheDataLoaded;

					socket.on("messages", (data: { data: MessageType }) => {
						console.log(data);
						updateCachedData((draft) => {
							draft.push(data?.data);
						});
					});
				} catch (err: unknown) {
					//
				}
				await cacheEntryRemoved;
				socket.close();
			},
		}),
		addMessage: builder.mutation({
			query: (data) => ({
				url: "/messages",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;

export default messagesApi;
