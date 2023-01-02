import { VideoType } from "../../features/types";

type iProps = Pick<VideoType, "link" | "title">;

export default function Player({ link, title }: iProps) {
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
}
