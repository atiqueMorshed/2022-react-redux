import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchVideos } from "../../features/videos/videos.thunk";
import { selectVideos } from "../../features/videos/videosSlice";
import RelatedVideoListItem from "./RelatedVideoListItem";

type IProps = {
	currentVideoId: number;
	currentVideoTags: string[];
};

const RelatedVideoList = ({ currentVideoId, currentVideoTags }: IProps) => {
	const videos = useAppSelector(selectVideos);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);

	return (
		<div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
			<RelatedVideoListItem />
		</div>
	);
};
export default RelatedVideoList;
