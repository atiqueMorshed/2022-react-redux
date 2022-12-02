import { TagsType } from "../../features/tags/tags.types";

type IProps = {
	tag: TagsType;
};

const Tag = ({ tag: { title } }: IProps) => {
	return (
		<div className="px-4 py-1 text-blue-600 bg-blue-100 rounded-full cursor-pointer">
			{title}
		</div>
	);
};

export default Tag;
