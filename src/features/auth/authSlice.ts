import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthStateType = {
	accessToken?: string;
	user?: {
		email: string;
		name: string;
		id: number;
	};
};

const initialState: AuthStateType = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn: (state, action: PayloadAction<AuthStateType>) => {
			state.accessToken = action.payload.accessToken;
			state.user = action.payload.user;
		},
		userLoggedOut: (state) => {
			state.accessToken = undefined;
			state.user = undefined;
		},
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
