import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import { VideoType } from "../../../features/types";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

type iProps = Pick<VideoType, "id" | "tags">;

export default function RelatedVideos({ id, tags }: iProps) {
	const {
		data: relatedVideos,
		isLoading,
		isError,
		isSuccess,
	} = useGetRelatedVideosQuery({ id, tags });

	let content = null;

	if (isLoading) {
		content = (
			<>
				<RelatedVideoLoader />
				<RelatedVideoLoader />
				<RelatedVideoLoader />
				<RelatedVideoLoader />
				<RelatedVideoLoader />
			</>
		);
	}

	if (!isLoading && isError) {
		content = <Error message="There was an error!" />;
	}

	if (isSuccess && relatedVideos?.length === 0) {
		content = <Error message="No related videos found!" />;
	}

	if (isSuccess && relatedVideos?.length > 0) {
		content = relatedVideos.map((video) => (
			<RelatedVideo key={video.id} video={video} />
		));
	}

	return (
		<div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
			{content}
		</div>
	);
}
