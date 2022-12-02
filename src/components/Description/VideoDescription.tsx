import React from "react";
import { VideoType } from "../../features/video/video.types";
import LikeUnlike from "./LikeUnlike";

type IProps = {
	video: VideoType;
};

const VideoDescription = ({
	video: { title, date, description, likes, unlikes },
}: IProps) => {
	return (
		<div>
			<h1 className="text-lg font-semibold tracking-tight text-slate-800">
				{title}
			</h1>
			<div className="flex items-center pb-4 border-b space-between">
				<h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
					Uploaded on {date}
				</h2>

				{/* Like Unlike */}
				<LikeUnlike likes={likes} unlikes={unlikes} />
			</div>

			{/* Video Description */}
			<div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
				{description}
			</div>
		</div>
	);
};

export default VideoDescription;
