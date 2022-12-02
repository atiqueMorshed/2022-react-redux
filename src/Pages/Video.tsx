import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import VideoDescription from "../components/Description/VideoDescription";
import VideoPlayer from "../components/Description/VideoPlayer";
import BasicError from "../components/Error/BasicError";
import Loading from "../components/Loading/Loading";
import RelatedVideoList from "../components/RelatedVideoList/RelatedVideoList";
import { fetchVideo } from "../features/video/video.thunk";
import { selectVideo } from "../features/video/videoSlice";

const Video = () => {
	const { videoId } = useParams();
	const navigate = useNavigate();
	let content;

	const { isLoading, isError, error, video } = useAppSelector(selectVideo);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!videoId) navigate("/");
	}, [videoId, navigate]);

	useEffect(() => {
		videoId && dispatch(fetchVideo(+videoId));
	}, [dispatch, videoId]);

	if (isLoading) content = <Loading />;
	else if (!isLoading && isError) content = <BasicError error={error} />;
	else if (video?.id) {
		content = (
			<div className="grid grid-cols-3 gap-2 lg:gap-8">
				<div className="w-full space-y-8 col-span-full lg:col-span-2">
					{/* Video Player */}
					<VideoPlayer video={video} />
					{/* Video Description */}
					<VideoDescription video={video} />
				</div>
				{/* Related Video List */}
				<RelatedVideoList
					currentVideoId={video.id}
					currentVideoTags={video.tags}
				/>
			</div>
		);
	}

	return (
		<div>
			<section className="pt-6 pb-20">
				<div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
					{content}
				</div>
			</section>
		</div>
	);
};

export default Video;
