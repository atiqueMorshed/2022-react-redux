import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../app/hooks";
import { fetchTags } from "../../features/tags/tags.thunk";
import { selectTags } from "../../features/tags/tagsSlice";
import Tag from "./Tag";

const Tags = () => {
	const { tagsList } = useSelector(selectTags);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTags());
	}, [dispatch]);

	return tagsList.length > 0 ? (
		<section>
			<div className="flex gap-2 px-5 py-6 mx-auto overflow-y-auto border-b max-w-7xl lg:px-0">
				{tagsList.map((tag) => (
					<Tag key={tag.id} tag={tag} />
				))}
			</div>
		</section>
	) : null;
};

export default Tags;
