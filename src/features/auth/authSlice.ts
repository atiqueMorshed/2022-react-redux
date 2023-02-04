import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserRegistrationReturnType } from "./auth.types";

const initialState: Partial<UserRegistrationReturnType> = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn: (
			state,
			action: PayloadAction<UserRegistrationReturnType>,
		) => {
			state.accessToken = action.payload.accessToken;
			state.user = action.payload.user;
		},
		userLoggedOut: (state) => {
			state.accessToken = undefined;
			state.user = undefined;
		},
	},
});

export const selectAuth = (state: RootState) => state.auth;

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
