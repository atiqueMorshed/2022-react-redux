export type TagsType = {
	id: number;
	title: "string";
};

export type TagsStateType = {
	isLoading: boolean;
	isError: boolean;
	tagsList: TagsType[];
	error?: string;
};
