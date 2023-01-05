import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
	const { videoId } = useParams();
	const {
		data: video,
		isLoading,
		isError,
		isSuccess,
		error,
	} = useGetVideoQuery(videoId as string);
	// 	const {
	// 	data: video,
	// 	isLoading,
	// 	isError,
	// 	isSuccess,
	// } = useGetVideoQuery(videoId as string, {
	// 	skip: true, // true: skips initial automatic fetching, can change this manually to create a manual fetch. (2) false (default value): fetches automatically on initial load. Can set the value dynamically using useState to control fetching.
	// 	/*
	// 	refetchOnMountOrArgChange
	// 	(1) true: Refetch if the component mounts (re-renders) or the component's arguments changes.
	// 	(2) false: (default) doesn't refetch on mount or arg change.
	// 	(3) number: (seconds) Only refetch on mount or arg change if number of seconds has passed.
	// 	*/
	// 	refetchOnMountOrArgChange: 5,
	// 	refetchOnFocus: true, // Refetch when website window gets in focus. By default false.
	// 	refetchOnReconnect: true, // Refetches if disconnected connection reconnects. By default false.
	// 	pollingInterval: 3000, // In milliseconds. refetches in interval.
	// });

	let content = null;
	if (isLoading) {
		content = (
			<>
				<PlayerLoader />
				<DescriptionLoader />
			</>
		);
	}

	if (!isLoading && isError) {
		content = <Error message="There was an error!" />;
		console.log(error);
	}

	if (isSuccess && video?.id) {
		content = (
			<>
				<Player link={video.link} title={video.title} />
				<Description video={video} />
			</>
		);
	}

	return (
		<section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
			<div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
				<div className="grid grid-cols-3 gap-2 lg:gap-8">
					<div className="w-full space-y-8 col-span-full lg:col-span-2">
						{content}
					</div>

					{video?.id ? (
						<RelatedVideos id={video.id} tags={video.tags} />
					) : isLoading ? (
						<>
							<RelatedVideoLoader />
							<RelatedVideoLoader />
							<RelatedVideoLoader />
						</>
					) : (
						<Error message="There was an error!" />
					)}
				</div>
			</div>
		</section>
	);
}
