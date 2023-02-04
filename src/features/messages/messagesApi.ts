import apiSlice from "../api/apiSlice";
import { MessagesType } from "./messages.type";

const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query<MessagesType, number | string>({
			query: (id) =>
				`/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
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
