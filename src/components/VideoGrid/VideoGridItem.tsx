import React from "react";
import { useNavigate } from "react-router-dom";
type IProps = {
	id: number;
};
const VideoGridItem = ({ id }: IProps) => {
	const navigate = useNavigate();
	return (
		<div
			className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03] cursor-pointer"
			onClick={() => navigate(`/video/${id}`)}
		>
			<div className="w-full flex flex-col">
				<div className="relative">
					<img
						src="https://i3.ytimg.com/vi/SZMWKCgvaDY/maxresdefault.jpg"
						className="w-full h-auto"
						alt="Some video title"
					/>

					<p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">
						12:10
					</p>
				</div>

				<div className="flex flex-row mt-2 gap-2">
					<div className="shrink-0">
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
					</div>

					<div className="flex flex-col">
						<p className="text-slate-900 text-sm font-semibold">
							Video title
						</p>

						<div className="text-gray-400 text-xs mt-2 hover:text-gray-600">
							Video Title
						</div>
						<p className="text-gray-400 text-xs mt-1">
							69 views . Jan 1, 2000
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoGridItem;