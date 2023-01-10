import { createSlice } from "@reduxjs/toolkit";

type conversationsState = {
	value: number;
};

const initialState: conversationsState = {
	value: 0,
};

const conversationsSlice = createSlice({
	name: "conversations",
	initialState,
	reducers: {},
});

// export const {} = conversationsSlice.actions;
export default conversationsSlice.reducer;
