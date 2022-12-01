import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
	const response = await fetch("http://localhost:4000/videos");
	return response.json();
});
