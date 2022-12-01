import React from "react";

const VideoPlayer = () => {
	return (
		<iframe
			width="100%"
			className="aspect-video"
			src="https://www.youtube.com/embed/SZMWKCgvaDY"
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	);
};

export default VideoPlayer;
