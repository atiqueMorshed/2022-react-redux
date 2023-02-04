import gravatarUrl from "gravatar-url";

type iProps = {
	justify: string;
	message: string;
	myMsg: boolean;
	email: string;
};
export default function Message({ justify, message, myMsg, email }: iProps) {
	return (
		<li className={`flex justify-${justify}`}>
			<div className="flex items-center justify-center gap-2">
				{!myMsg && (
					<img
						className="rounded-full"
						src={gravatarUrl(email, { size: 50 })}
						alt=""
					/>
				)}
				<div
					className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ${
						myMsg && "bg-blue-500"
					}`}
				>
					<span className={`block ${myMsg && "text-white"}`}>{message}</span>
				</div>
			</div>
		</li>
	);
}
