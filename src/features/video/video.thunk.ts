import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVideo } from "./videoAPI";

export const fetchVideo = createAsyncThunk(
	"videos/fetchVideo",
	async (videoId: number) => {
		return await getVideo(videoId);
	}
);
