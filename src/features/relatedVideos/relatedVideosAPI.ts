import axiosInstance from "../../utils/axios";
import { RelatedVideosQueryStringType } from "./relatedVideos.types";

export const getRelatedVideos = async ({
	tags,
	id,
}: RelatedVideosQueryStringType) => {
	let queryString =
		tags?.length > 0
			? tags.map((tag) => `tags_like=${tag}`).join("&") +
			  `&id_ne=${id}&_limit=5`
			: `id_ne=${id}&_limit=5`;

	console.log(queryString);
	if (queryString) {
		const response = await axiosInstance.get(`videos?${queryString}`);
		return response.data;
	}
	return [];
};
