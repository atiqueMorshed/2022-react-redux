import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FilterStateType } from "./filter.types";

const initialState: FilterStateType = {
	tags: [],
	search: "",
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		toggleTag: (state, action) => {
			const indexIfExists = state.tags.indexOf(action.payload);
			indexIfExists === -1
				? state.tags.push(action.payload)
				: state.tags.splice(indexIfExists, 1);
			// splice(startingIndex, howManyToRemove, elementToBeAdded1, elementToBeAdded2, ...)
		},

		searchVideos: (state, action) => {
			state.search = action.payload;
		},
	},
});

export const { toggleTag, searchVideos } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
