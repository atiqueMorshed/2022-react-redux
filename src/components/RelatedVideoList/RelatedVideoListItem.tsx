import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoType } from "../../features/video/video.types";

type IProps = {
	video: VideoType;
};

const RelatedVideoListItem = ({
	video: { id, thumbnail, title, duration, author, views, date },
}: IProps) => {
	const navigate = useNavigate();

	return (
		<div
			className="flex flex-row w-full gap-2 mb-4 cursor-pointer"
			onClick={() => navigate(`/video/${id}`)}
		>
			<div className="relative w-[168px] h-[94px] flex-none duration-300 hover:scale-[1.03]">
				<img
					src={thumbnail}
					className="object-cover"
					alt="Some video title"
				/>

				<p className="absolute px-1 text-xs text-gray-100 bg-gray-900 right-2 bottom-2 py">
					{duration}
				</p>
			</div>

			<div className="flex flex-col w-full">
				<div>
					<p className="text-sm font-semibold text-slate-900">
						{title}
					</p>
				</div>
				<div className="mt-2 text-xs text-gray-400 hover:text-gray-600">
					{author}
				</div>
				<p className="mt-1 text-xs text-gray-400">
					{views} views . {date}
				</p>
			</div>
		</div>
	);
};

export default RelatedVideoListItem;
