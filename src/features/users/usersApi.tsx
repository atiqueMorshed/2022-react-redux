import apiSlice from "../api/apiSlice";
import { EmailType } from "../types";
import { RegisteredUserType } from "./users.type";

const usersApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<RegisteredUserType | [], EmailType>({
			query: (email) => `/users?email=${email}`,
		}),
	}),
});

export const { useGetUserQuery } = usersApi;
