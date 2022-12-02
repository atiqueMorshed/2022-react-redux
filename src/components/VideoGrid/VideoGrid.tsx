import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos } from "../../features/videos/videos.thunk";
import { selectVideos } from "../../features/videos/videosSlice";
import BasicError from "../Error/BasicError";
import Loading from "../Loading/Loading";
import VideoGridItem from "./VideoGridItem";

const VideoGrid = () => {
	const { isLoading, videoList, isError, error } =
		useAppSelector(selectVideos);
	const dispatch = useAppDispatch();
	let content;

	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);

	if (isLoading) content = <Loading />;
	else if (!isLoading && isError) content = <BasicError error={error} />;
	else if (!isLoading && !isError && videoList.length > 0) {
		content = videoList.map((video) => (
			<VideoGridItem key={video.id} video={video} />
		));
	} else {
		content = (
			<div className="max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px] flex justify-center items-center text-gray-800 text-xl font-bold">
				No videos available.
			</div>
		);
	}

	return (
		<section className="pt-12">
			<section className="pt-12">
				<div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
					{content}
				</div>
			</section>
		</section>
	);
};

export default VideoGrid;
