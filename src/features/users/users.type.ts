export type RegisteredUserType = [
	{
		id: number;
		name: string;
		email: string;
		password: string;
	},
];

export const isValidUserType = (user: unknown): user is RegisteredUserType => {
	if (Array.isArray(user) && typeof user[0] === "object" && "id" in user[0])
		return true;
	return false;
};
