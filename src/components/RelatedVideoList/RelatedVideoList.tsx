import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideos.thunk";
import { selectRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import RelatedVideoListItem from "./RelatedVideoListItem";

type IProps = {
	currentVideoId: number;
	currentVideoTags: string[];
};

const RelatedVideoList = ({ currentVideoId, currentVideoTags }: IProps) => {
	const dispatch = useAppDispatch();
	const { videoList } = useAppSelector(selectRelatedVideos);

	useEffect(() => {
		dispatch(
			fetchRelatedVideos({ tags: currentVideoTags, id: currentVideoId })
		);
	}, [dispatch, currentVideoId, currentVideoTags]);

	return (
		<div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
			{videoList.length > 0
				? videoList.map((video) => (
						<RelatedVideoListItem key={video.id} video={video} />
				  ))
				: "No related videos found!"}
		</div>
	);
};
export default RelatedVideoList;
