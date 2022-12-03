import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { VideosStateType } from "../videos/videos.types";
import { fetchRelatedVideos } from "./relatedVideos.thunk";

const initialState: VideosStateType = {
	isLoading: false,
	isError: false,
	videoList: [],
	error: "",
};

const relatedVideosSlice = createSlice({
	name: "relatedVideos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRelatedVideos.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.error = "";
				state.videoList = [];
			})
			.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videoList = action.payload;
			})
			.addCase(fetchRelatedVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.videoList = [];
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export const selectRelatedVideos = (state: RootState) => state.relatedVideos;

export default relatedVideosSlice.reducer;
