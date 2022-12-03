import { createAsyncThunk } from "@reduxjs/toolkit";
import { RelatedVideosQueryStringType } from "./relatedVideos.types";
import { getRelatedVideos } from "./relatedVideosAPI";

export const fetchRelatedVideos = createAsyncThunk(
	"relatedVideos/fetchRelatedVideos",
	async (queryString: RelatedVideosQueryStringType) => {
		return await getRelatedVideos(queryString);
	}
);
