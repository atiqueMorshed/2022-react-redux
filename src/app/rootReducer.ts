import { combineReducers } from "@reduxjs/toolkit";

import videosReducer from "../features/videos/videosSlice";
import videoReducer from "../features/video/videoSlice";
import tagsReducer from "../features/tags/tagsSlice";

const rootReducer = combineReducers({
	videos: videosReducer,
	video: videoReducer,
	tags: tagsReducer,
});

export default rootReducer;
