import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

// Features -> Auth, Conversation With, and Messages
// We have separated API calls for them. So, the endpoint is empty.
// We will import this apiSlice to wherever we need and call injectEndpoints on it to extend APIs.

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders: async (headers, { getState, endpoint }) => {
			// endpoint is the string that contains the current url. We can use that to conditionally set headers for set urls

			const token = (getState() as RootState)?.auth?.accessToken;
			if (token) headers.set("Authorization", `Bearer ${token}`);

			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});

export default apiSlice;
