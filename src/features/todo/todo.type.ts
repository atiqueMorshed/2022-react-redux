export type TodoIdType = string;
export type TodoContentType = string;
export type DateType = string;
export type IsCompleteType = boolean;
export type TodoColorType = string;

export type TodoType = {
	id: TodoIdType;
	todoContent: TodoContentType;
	date: string;
	isComplete: boolean;
	color: TodoColorType;
};

export type TodoStateType = {
	loading: true | false;
	todoList: TodoType[];
	error: string;
};
