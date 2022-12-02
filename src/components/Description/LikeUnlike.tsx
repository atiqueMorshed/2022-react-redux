import React from "react";
import likeIcon from "../../assets/like.svg";
import unlikeIcon from "../../assets/unlike.svg";

type IProps = {
	likes: number;
	unlikes: number;
};
const LikeUnlike = ({ likes, unlikes }: IProps) => {
	return (
		<div className="flex w-48 gap-10">
			<div className="flex items-center gap-1">
				<div className="shrink-0">
					<img className="block w-5" src={likeIcon} alt="Like" />
				</div>
				<div className="text-sm leading-[1.7142857] text-slate-600">
					{likes}
				</div>
			</div>
			<div className="flex items-end gap-1">
				<div className="shrink-0">
					<img className="block w-5" src={unlikeIcon} alt="Unlike" />
				</div>
				<div className="text-sm leading-[1.7142857] text-slate-600">
					{unlikes}
				</div>
			</div>
		</div>
	);
};

export default LikeUnlike;
