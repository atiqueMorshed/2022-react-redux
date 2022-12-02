import { VideoType } from "../video/video.types";

export type VideosStateType = {
	videoList: VideoType[];
	isLoading: boolean;
	isError: boolean;
	error?: string;
};
