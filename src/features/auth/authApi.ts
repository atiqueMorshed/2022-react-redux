import apiSlice from "../api/apiSlice";
import { FullUserProfileType, UserRegistrationReturnType } from "./auth.types";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<
			UserRegistrationReturnType,
			Pick<FullUserProfileType, "name" | "email" | "password">
		>({
			query: (data) => ({
				url: "/register",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled; // we get the data in result.data

					localStorage.setItem(
						"chat-auth",
						JSON.stringify({
							accessToken: result.data.accessToken,
							user: result.data.user,
						}),
					);

					dispatch(
						userLoggedIn({
							accessToken: result.data.accessToken,
							user: result.data.user,
						}),
					);
				} catch (err) {
					// DO NOTHING.
					// We will handle the error in UI (form submit).
				}
			},
		}),
		login: builder.mutation<
			UserRegistrationReturnType,
			Pick<FullUserProfileType, "email" | "password">
		>({
			query: (data) => ({
				url: "/login",
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					localStorage.setItem(
						"chat-auth",
						JSON.stringify({
							accessToken: result.data.accessToken,
							user: result.data.user,
						}),
					);

					dispatch(
						userLoggedIn({
							accessToken: result.data.accessToken,
							user: result.data.user,
						}),
					);
				} catch (err) {
					// DO NOTHING
					// We will handle the error in UI (form submit).
				}
			},
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
