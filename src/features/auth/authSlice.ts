import { createSlice } from "@reduxjs/toolkit";

type authState = {
	value: number;
};

const initialState: authState = {
	value: 0,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
