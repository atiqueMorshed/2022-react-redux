import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoType } from "../../features/video/video.types";

type IProps = {
	video: VideoType;
};

const VideoGridItem = ({
	video: { id, author, avatar, date, duration, thumbnail, title, views },
}: IProps) => {
	const navigate = useNavigate();
	return (
		<div
			className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03] cursor-pointer"
			onClick={() => navigate(`/video/${id}`)}
		>
			<div className="flex flex-col w-full">
				<div className="relative">
					<img
						src={thumbnail}
						className="w-full h-auto"
						alt="Some video title"
					/>

					<p className="absolute px-1 text-xs text-gray-100 bg-gray-900 right-2 bottom-2 py">
						{duration}
					</p>
				</div>

				<div className="flex flex-row gap-2 mt-2">
					<div className="shrink-0">
						<img
							className="w-8 h-auto mt-2 border rounded-full"
							src={avatar}
							alt="Avatar"
						/>
					</div>

					<div className="flex flex-col">
						<p className="text-sm font-semibold text-slate-900">
							{title}
						</p>

						<div className="mt-2 text-xs text-gray-400 hover:text-gray-600">
							{author}
						</div>
						<p className="mt-1 text-xs text-gray-400">
							{`${views} views. ${date}`}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoGridItem;
