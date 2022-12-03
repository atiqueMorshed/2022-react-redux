import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilterStateType } from "../filter/filter.types";
import { getVideos } from "./videosAPI";

export const fetchVideos = createAsyncThunk(
	"videos/fetchVideos",
	async (filterOptions: FilterStateType) => {
		return await getVideos(filterOptions);
	}
);
