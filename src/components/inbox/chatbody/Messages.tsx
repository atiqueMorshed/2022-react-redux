import { MessagesType } from "../../../features/messages/messages.type";
import { ShortUserType } from "../../../features/types";

import Message from "./Message";

type iProps = {
	messages: MessagesType;
	user: ShortUserType;
};

const Messages = ({ messages, user }: iProps) => {
	return (
		<div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
			<ul className="space-y-2">
				{messages
					.slice()
					.sort((a, b) => a.timestamp - b.timestamp)
					.map((message) => (
						<Message
							key={message.id}
							justify={`${
								message.sender.email === user.email ? "end" : "start"
							}`}
							myMsg={message.sender.email === user.email}
							message={message.message}
							email={user.email}
						/>
					))}
			</ul>
		</div>
	);
};

export default Messages;
