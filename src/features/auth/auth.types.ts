export type FullUserProfileType = {
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

export const isValidLoggedInUserType = (
	user: unknown,
): user is Pick<UserRegistrationReturnType, "user"> => {
	if (user !== null && typeof user === "object" && "id" in user) return true;
	return false;
};
