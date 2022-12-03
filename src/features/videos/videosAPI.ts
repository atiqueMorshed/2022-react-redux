import axiosInstance from "../../utils/axios";
import { FilterStateType } from "../filter/filter.types";

export const getVideos = async ({ tags, search }: FilterStateType) => {
	let queryString = "";
	if (tags.length > 0)
		queryString = tags.map((tag) => `tags_like=${tag}`).join("&");
	if (search.length > 0) queryString += `&q=${search}`;

	if (queryString.length > 0) queryString = "?" + queryString;

	const response = await axiosInstance.get(`/videos${queryString}`);
	return response.data;
};
