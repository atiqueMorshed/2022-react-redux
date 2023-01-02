import { Link } from "react-router-dom";
import { VideoType } from "../../features/types";

type iProps = {
	video: VideoType;
};

export default function Video({
	video: { id, title, duration, author, views, date, thumbnail },
}: iProps) {
	return (
		<div className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]">
			<div className="flex flex-col w-full">
				<div className="relative">
					<Link to={`/videos/${id}`}>
						<img src={thumbnail} className="w-full h-auto" alt={title} />
					</Link>

					<p className="absolute px-1 text-xs text-gray-100 bg-gray-900 right-2 bottom-2 py">
						{duration}
					</p>
				</div>

				<div className="flex flex-row gap-2 mt-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>

					<div className="flex flex-col">
						<Link to={`/videos/${id}`}>
							<p className="text-sm font-semibold text-slate-900">{title}</p>
						</Link>
						<span className="text-xs text-gray-400 hover:text-gray-600">
							{author}
						</span>
						<p className="text-xs text-gray-400">
							{views} views . {date}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
