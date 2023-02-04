// import Blank from "./Blank";
import gravatarUrl from "gravatar-url";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/authSlice";
import { getErrorMessage } from "../../../features/error.types";
import { isValidMessagesType } from "../../../features/messages/messages.type";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
	const { id } = useParams();
	const { user } = useAppSelector(selectAuth);
	const {
		data: messages,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useGetMessagesQuery(id || "x");

	let content;

	if (isLoading) content = <div>Loading...</div>;
	else if (isError) content = <Error message={getErrorMessage(error)} />;
	else if (isSuccess) {
		if (isValidMessagesType(messages) && user?.email) {
			const chatHeadUser =
				messages[0].sender.email === user.email
					? messages[0].receiver
					: messages[0].sender;
			content = (
				<>
					<ChatHead
						avatar={gravatarUrl(chatHeadUser.email, { size: 80 })}
						name={chatHeadUser.name}
					/>
					<Messages messages={messages} user={user} />
					<Options />
				</>
			);
		} else content = <div className="">No chat history found.</div>;
	}

	return (
		<div className="w-full lg:col-span-2 lg:block">
			<div className="grid w-full conversation-row-grid">
				{content}
				{/* <Blank /> */}
			</div>
		</div>
	);
}
