type iProps = {
	title: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const TextInput = ({ title, ...attributes }: iProps) => {
	return (
		<>
			<label className="block text-sm font-medium text-gray-700">{title}</label>
			<input
				type="text"
				className="block w-full py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				{...attributes}
			/>
		</>
	);
};
export default TextInput;
