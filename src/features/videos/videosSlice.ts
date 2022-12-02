import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchVideos } from "./videos.thunk";
import { VideosStateType } from "./videos.types";

const initialState: VideosStateType = {
	videoList: [],
	isLoading: false,
	isError: false,
	error: "",
};

const videosSlice = createSlice({
	name: "videos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideos.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.error = "";
				state.videoList = [];
			})
			.addCase(fetchVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videoList = action.payload;
			})
			.addCase(fetchVideos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
				state.videoList = [];
			});
	},
});

export const selectVideos = (state: RootState) => state.videos;

export default videosSlice.reducer;
