import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Features -> Auth, Conversation With, and Messages
// We have separated API calls for them. So, the endpoint is empty.
// We will import this apiSlice to wherever we need and call injectEndpoints on it to extend APIs.

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
	}),
	endpoints: (builder) => ({}),
});

export default apiSlice;
