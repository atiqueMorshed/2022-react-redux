import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { isValidLoggedInUserType } from "../../../features/auth/auth.types";
import { selectAuth } from "../../../features/auth/authSlice";
import { isValidConversationsType } from "../../../features/conversations/conversations.type";
import conversationsApi, {
	useGetConversationsQuery,
} from "../../../features/conversations/conversationsApi";
import { getErrorMessage } from "../../../features/error.types";
import Error from "../../ui/Error";
import ChatItem from "../ChatItem";

export default function ChatItems() {
	const { user } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const { isError, isLoading, isSuccess, data, error } =
		useGetConversationsQuery(user?.email || "invalid");

	const { conversations, totalConversationsCount } = data || {};

	useEffect(() => {
		if (page > 1 && isValidLoggedInUserType(user)) {
			dispatch(
				conversationsApi.endpoints.getExtraConversationsOnScroll.initiate({
					email: user.email,
					page,
				}),
			);
		}
	}, [page, user, dispatch]);

	useEffect(() => {
		if (
			totalConversationsCount &&
			totalConversationsCount > 0 &&
			process.env.REACT_APP_CONVERSATIONS_PER_PAGE
		) {
			const maximumPages = Math.ceil(
				totalConversationsCount /
					parseInt(process.env.REACT_APP_CONVERSATIONS_PER_PAGE),
			);
			setHasMore(maximumPages > page);
		}
	}, [totalConversationsCount, page, setHasMore]);

	const fetchMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	let content;

	if (isLoading) content = <li className="m-2 text-center">Loading...</li>;
	else if (isError) content = <Error message={getErrorMessage(error)} />;
	else if (isSuccess) {
		// Type Guard
		if (isValidConversationsType(conversations)) {
			content = (
				<InfiniteScroll
					dataLength={conversations.length} //This is important field to render the next data
					next={fetchMore}
					hasMore={hasMore}
					loader={<h4>Loading...</h4>}
					height={window.innerHeight - 129}
				>
					{conversations.map((c) => {
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
					})}
				</InfiniteScroll>
			);
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
