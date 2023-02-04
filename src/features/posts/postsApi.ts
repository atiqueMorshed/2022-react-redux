import apiSlice from "../api/apiSlice";

const postsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addPost: builder.mutation({
			query: (data) => ({
				url: "/posts",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useAddPostMutation } = postsApi;

export default postsApi;
