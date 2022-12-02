import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchTags } from "./tags.thunk";
import { TagsStateType } from "./tags.types";

const initialState: TagsStateType = {
	isLoading: false,
	isError: false,
	tagsList: [],
	error: "",
};

const tagsSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTags.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.tagsList = [];
				state.error = "";
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.tagsList = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchTags.rejected, (state, action) => {
				state.tagsList = [];
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export const selectTags = (state: RootState) => state.tags;

export default tagsSlice.reducer;
