type iProps = {
	message: string;
};

export default function Error({ message }: iProps) {
	return (
		<div className="flex items-center justify-center w-full h-10 col-span-12 p-2 mx-auto text-red-700 bg-red-100 max-w-7xl">
			{message}
		</div>
	);
}
