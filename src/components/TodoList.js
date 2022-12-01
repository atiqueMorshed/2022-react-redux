import { useAppSelector } from "../app/hooks";
import { selectTodos } from "../features/todo/todoSlice";
import Todo from "./Todo";

export default function TodoList() {
	const todos = useAppSelector(selectTodos);

	return (
		<div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
			{todos.map((todo) => (
				<Todo key={todo.id} todo={todo} />
			))}
		</div>
	);
}
