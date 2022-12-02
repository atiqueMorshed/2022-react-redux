import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTags } from "./tagsAPI";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
	return await getTags();
});
