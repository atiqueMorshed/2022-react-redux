import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isValidLoggedInUserType } from "../../features/auth/auth.types";
import { selectAuth } from "../../features/auth/authSlice";
import { ReceivedConversationType } from "../../features/conversations/conversations.type";
import conversationsApi, {
	useAddConversationMutation,
	useEditConversationMutation,
} from "../../features/conversations/conversationsApi";
import { getErrorMessage } from "../../features/error.types";
import { isValidUserType } from "../../features/users/users.type";
import { useGetUserQuery } from "../../features/users/usersApi";
import isValidEmail from "../../utils/isValidEmail";
import Error from "../ui/Error";

type iProps = {
	open: boolean;
	control: () => void;
};

export default function Modal({ open, control }: iProps) {
	const { user: loggedInUser } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState("");
	const [receiver, setReceiver] = useState("");

	const [startEmailChecking, setStartEmailChecking] = useState(false);

	const [conversation, setConversation] = useState<
		undefined | [] | ReceivedConversationType
	>(undefined);
	const [conversationError, setConversationError] = useState("");

	// Type 01 (using hooks)
	const { data: participant, isError: isErrorGettingParticipant } =
		useGetUserQuery(receiver, {
			skip: !startEmailChecking,
		});

	// Type 01 (using hooks) [get conversation]
	// const { data: conversation } = useGetConversationQuery(
	// 	{
	// 		userEmail: loggedInUser?.email || "inv",
	// 		participantEmail:
	// 			(participant?.length === 1 && participant[0]?.email) || "inv",
	// 	},
	// 	{
	// 		skip: !(
	// 			loggedInUser?.email &&
	// 			participant?.length === 1 &&
	// 			participant[0].email !== loggedInUser.email
	// 		),
	// 	},
	// );

	const [
		addConversation,
		{
			isSuccess: isAddConversationSuccess,
			isError: isAddConversationError,
			error: addConversationError,
		},
	] = useAddConversationMutation();
	const [
		editConversation,
		{
			isSuccess: isEditConversationSuccess,
			isError: isEditConversationError,
			error: editConversationError,
		},
	] = useEditConversationMutation();

	// When receiver user is varified, get their conversation (or empty array if they didn't converse).
	useEffect(() => {
		if (
			isValidUserType(participant) &&
			isValidLoggedInUserType(loggedInUser) &&
			loggedInUser.email !== participant[0].email
		) {
			// Type 02 (dispatching thunk) [get conversation]
			dispatch(
				conversationsApi.endpoints.getConversation.initiate({
					userEmail: loggedInUser.email,
					participantEmail: participant[0].email,
				}),
			)
				.unwrap()
				.then((data) => {
					setConversation(data);
				})
				.catch(() => {
					setConversationError("Error getting conversation.");
					setConversation(undefined);
				});
		}
	}, [participant, loggedInUser, dispatch]);

	// on Successful add/edit conversation mutation, close the modal

	useEffect(() => {
		if (isAddConversationSuccess || isEditConversationSuccess) control();
	}, [isAddConversationSuccess, isEditConversationSuccess]);

	const searchEmail = (value: string) => {
		if (isValidEmail(value)) {
			setReceiver(value);
			setStartEmailChecking(true);
		} else {
			setStartEmailChecking(false);
			setReceiver("");
			setConversation(undefined);
		}
	};

	const handleDebounce = (fn: (value: string) => void, delay: number) => {
		let timeoutFn: ReturnType<typeof setTimeout>;
		return (value: string) => {
			clearTimeout(timeoutFn);
			timeoutFn = setTimeout(() => fn(value), delay);
		};
	};

	const handleReceiver = handleDebounce(searchEmail, 500);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!isValidUserType(participant) ||
			!Array.isArray(conversation) ||
			!isValidLoggedInUserType(loggedInUser)
		) {
			return;
		}
		if (conversation.length === 0) {
			addConversation({
				senderEmail: participant[0].email,
				data: {
					participants: `${loggedInUser.email}-${participant[0].email}`,
					users: [
						{
							id: loggedInUser.id,
							name: loggedInUser.name,
							email: loggedInUser.email,
						},
						{
							id: participant[0].id,
							name: participant[0].name,
							email: participant[0].email,
						},
					],
					message,
					timestamp: new Date().getTime(),
				},
			});
		} else {
			editConversation({
				id: conversation[0].id,
				senderEmail: participant[0].email,
				data: {
					users: [
						{
							id: loggedInUser.id,
							name: loggedInUser.name,
							email: loggedInUser.email,
						},
						{
							id: participant[0].id,
							name: participant[0].name,
							email: participant[0].email,
						},
					],
					message,
					timestamp: new Date().getTime(),
				},
			});
		}
	};

	let checkUserContent;
	if (isValidUserType(participant) && isValidLoggedInUserType(loggedInUser)) {
		if (participant[0].email === loggedInUser.email) {
			checkUserContent = (
				<p className="pt-1 pb-2 text-sm font-semibold text-red-300">
					You cannot send message to yourself
				</p>
			);
		} else {
			checkUserContent = (
				<p className="pt-1 pb-2 text-sm font-semibold text-indigo-500">
					User Found!
				</p>
			);
		}
	}

	return open ? (
		<>
			<div
				onClick={control}
				className="fixed inset-0 z-10 w-full h-full cursor-pointer bg-black/50"
			></div>
			<div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
				<h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
					Send message
				</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="-space-y-px rounded-md shadow-sm">
						<div>
							<label htmlFor="to" className="sr-only">
								To
							</label>
							<input
								id="to"
								name="to"
								type="to"
								required
								className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
								placeholder="Send to"
								onChange={(e) => handleReceiver(e.target.value)}
							/>
							{participant?.length === 0 && (
								<p className="pt-1 pb-2 text-sm font-semibold text-red-500">
									No user found!
								</p>
							)}

							{isErrorGettingParticipant && (
								<p className="pt-1 pb-2 text-sm font-semibold text-red-500">
									There was an unexpected error.
								</p>
							)}

							{checkUserContent}
						</div>
						<div>
							<label htmlFor="message" className="sr-only">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								required
								className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
								placeholder="Message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className={`"relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" ${
								(participant?.length === 0 ||
									conversation === undefined ||
									message === "") &&
								"bg-gray-700 bg-opacity-25"
							}`}
							disabled={
								participant?.length === 0 ||
								conversation === undefined ||
								message === ""
							}
						>
							Send Message
						</button>
					</div>

					{conversationError && <Error message={conversationError} />}

					{isAddConversationError && (
						<Error message={getErrorMessage(addConversationError)} />
					)}

					{isEditConversationError && (
						<Error message={getErrorMessage(editConversationError)} />
					)}
				</form>
			</div>
		</>
	) : null;
}
