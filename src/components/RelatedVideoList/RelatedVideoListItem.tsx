import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedVideoListItem = () => {
	const navigate = useNavigate();

	return (
		<div
			className="w-full flex flex-row gap-2 mb-4 cursor-pointer"
			onClick={() => navigate(`/video/2`)}
		>
			<div className="relative w-[168px] h-[94px] flex-none duration-300 hover:scale-[1.03]">
				<img
					src="https://i3.ytimg.com/vi/Xy5KAHD2uak/maxresdefault.jpg"
					className="object-cover"
					alt="Some video title"
				/>

				<p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">
					12:10
				</p>
			</div>

			<div className="flex flex-col w-full">
				<div>
					<p className="text-slate-900 text-sm font-semibold">
						Video Title
					</p>
				</div>
				<div className="text-gray-400 text-xs mt-2 hover:text-gray-600">
					Author
				</div>
				<p className="text-gray-400 text-xs mt-1">
					100K views . 23 Oct 2022
				</p>
			</div>
		</div>
	);
};

export default RelatedVideoListItem;
