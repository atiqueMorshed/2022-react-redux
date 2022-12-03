import { combineReducers } from "@reduxjs/toolkit";

import videosReducer from "../features/videos/videosSlice";
import videoReducer from "../features/video/videoSlice";
import relatedVideosReducer from "../features/relatedVideos/relatedVideosSlice";
import tagsReducer from "../features/tags/tagsSlice";
import filterReducer from "../features/filter/filterSlice";

const rootReducer = combineReducers({
	videos: videosReducer,
	video: videoReducer,
	relatedVideos: relatedVideosReducer,
	tags: tagsReducer,
	filter: filterReducer,
});

export default rootReducer;
