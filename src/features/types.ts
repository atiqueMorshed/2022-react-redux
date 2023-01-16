export type UserType = {
	id: number;
	name: string;
	password: string;
	email: string;
	avatar: string;
	lastMessage: string;
	lastTime: string;
};

export type UserRegistrationReturnType = {
	accessToken: string;
	user: {
		id: number;
		name: string;
		email: string;
	};
};
