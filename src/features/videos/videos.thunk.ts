import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVideos } from "./videosAPI";

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
	return await getVideos();
});
