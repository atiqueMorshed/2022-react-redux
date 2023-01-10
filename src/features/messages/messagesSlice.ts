import { createSlice } from "@reduxjs/toolkit";

type messagesState = {
	value: number;
};

const initialState: messagesState = {
	value: 0,
};

const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {},
});

// export const {} = messagesSlice.actions;
export default messagesSlice.reducer;
