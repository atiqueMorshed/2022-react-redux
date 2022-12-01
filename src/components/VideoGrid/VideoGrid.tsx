import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos } from "../../features/videos/videos.thunk";
import { selectVideos } from "../../features/videos/videosSlice";
import Video from "./VideoGridItem";

const VideoGrid = () => {
	const videos = useAppSelector(selectVideos);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);

	if (videos.isLoading) return <div className="">Loading...</div>;

	if (videos.error) return <div>error</div>;

	return (
		<section className="pt-12">
			<section className="pt-12">
				<div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
					{videos.videoList.map((video) => (
						<Video key={video.id} video={video} />
					))}
					{/* <div className="col-span-12">some error happened</div> */}
				</div>
			</section>
		</section>
	);
};

export default VideoGrid;
