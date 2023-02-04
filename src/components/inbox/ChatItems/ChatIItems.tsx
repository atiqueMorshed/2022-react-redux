import gravatarUrl from "gravatar-url";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/authSlice";
import { useGetConversationsQuery } from "../../../features/conversations/conversationsApi";
import { getErrorMessage } from "../../../features/error.types";
import Error from "../../ui/Error";
import ChatItem from "../ChatItem";
import { isValidConversations } from "./ChatItems.types";

export default function ChatItems() {
	const { user } = useAppSelector(selectAuth);
	const {
		isError,
		isLoading,
		isSuccess,
		data: conversations,
		error,
	} = useGetConversationsQuery(user?.email || "invalid");

	let content;

	if (isLoading) content = <li className="m-2 text-center">Loading...</li>;
	else if (isError) content = <Error message={getErrorMessage(error)} />;
	else if (isSuccess) {
		// Type Guard
		if (isValidConversations(conversations)) {
			content = conversations.map((c) => {
				const { name, email } = c.users.filter(
					(u) => u.email !== user?.email,
				)[0];
				return (
					<li key={c.id}>
						<Link to={`/inbox/${c.id}`}>
							<ChatItem
								avatar={gravatarUrl(email, { size: 80 })}
								name={name}
								lastMessage={c.message}
								lastTime={moment(c.timestamp).fromNow()}
							/>
						</Link>
					</li>
				);
			});
		} else {
			content = (
				<li className="m-2 text-center">
					<Error message="No Conversations Found!" />
				</li>
			);
		}
	}

	return <ul>{content}</ul>;
}
