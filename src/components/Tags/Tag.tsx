import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFilter, toggleTag } from "../../features/filter/filterSlice";
import { TagsType } from "../../features/tags/tags.types";

type IProps = {
	tag: TagsType;
};

const Tag = ({ tag: { title } }: IProps) => {
	const { tags: selectedTags } = useAppSelector(selectFilter);
	const dispatch = useAppDispatch();

	return (
		<div
			className={`px-4 py-1  bg-blue-100 rounded-full cursor-pointer ${
				selectedTags.includes(title)
					? "bg-blue-500 text-white font-semibold"
					: "bg-blue-100 text-blue-600"
			}`}
			onClick={() => dispatch(toggleTag(title))}
		>
			{title}
		</div>
	);
};

export default Tag;
