import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { TodoStateType, TodoType } from "./todo.type";
import { RootState } from "../../app/store";

const initialState: TodoStateType = {
	loading: false,
	todoList: [],
	error: "",
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<TodoType>) => {
				state.todoList.push(action.payload);
			},
			prepare: (content: string) => ({
				payload: {
					id: uuidv4(),
					todoContent: content,
					date: moment().format(),
					isComplete: false,
					color: "green",
				},
			}),
		},
	},
});
export const { addTodo } = todoSlice.actions;
// This selectTodos can be used in useAppSelector to select todos
export const selectTodos = (state: RootState) => state.todos;
export default todoSlice.reducer;
