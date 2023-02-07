import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { userLoggedOut } from "../auth/authSlice";

// Features -> Auth, Conversation With, and Messages
// We have separated API calls for them. So, the endpoint is empty.
// We will import this apiSlice to wherever we need and call injectEndpoints on it to extend APIs.

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_API_URL,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	prepareHeaders: async (headers, { getState, endpoint }) => {
		// endpoint is the string that contains the current url. We can use that to conditionally set headers for set urls

		const token = (getState() as RootState)?.auth?.accessToken;
		if (token) headers.set("Authorization", `Bearer ${token}`);

		return headers;
	},
});

const apiSlice = createApi({
	reducerPath: "api",
	// baseQuery: fetchBaseQuery({
	// 	baseUrl: process.env.REACT_APP_API_URL,
	// 	prepareHeaders: async (headers, { getState, endpoint }) => {
	// 		// endpoint is the string that contains the current url. We can use that to conditionally set headers for set urls

	// 		const token = (getState() as RootState)?.auth?.accessToken;
	// 		if (token) headers.set("Authorization", `Bearer ${token}`);

	// 		return headers;
	// 	},
	// }),
	baseQuery: async (args, api, endpoints) => {
		// Here, we are intercepting all api requests and checking if the server responded that the JWT expired. If that is the case, we are logging out our user.
		const result = await baseQuery(args, api, endpoints);
		if (result?.error?.status === 401) {
			api.dispatch(userLoggedOut());
			localStorage.removeItem("chat-auth");
		}
		return result;
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	endpoints: (builder) => ({}),
});

export default apiSlice;
