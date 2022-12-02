import React from "react";
import { VideoType } from "../../features/video/video.types";
type IProps = {
	video: VideoType;
};

const VideoPlayer = ({ video: { title, link } }: IProps) => {
	return (
		<iframe
			width="100%"
			className="aspect-video"
			src={link}
			title={title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	);
};

export default VideoPlayer;
