export type VideoType = {
	id: number;
	title: string;
	description: string;
	author: string;
	avatar: string;
	date: string;
	duration: string;
	views: string;
	link: string;
	thumbnail: string;
	tags: string[];
	likes: number;
	unlikes: number;
};

export type VideosStateType = {
	videoList: VideoType[];
	isLoading: boolean;
	isError: boolean;
	error: string;
};
