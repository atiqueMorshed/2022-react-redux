import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchVideo } from "./video.thunk";
import { VideoStateType } from "./video.types";

const initialState: VideoStateType = {
	isLoading: false,
	isError: false,
	error: "",
};

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideo.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.error = "";
				state.video = undefined;
			})
			.addCase(fetchVideo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.video = action.payload;
			})
			.addCase(fetchVideo.rejected, (state, action) => {
				state.isLoading = false;
				state.video = undefined;
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export const selectVideo = (state: RootState) => state.video;

export default videoSlice.reducer;
