import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";

const useAuth = () => {
	const authObject = useAppSelector(selectAuth);

	if (authObject?.accessToken && authObject?.user) return true;
	return false;
};

export default useAuth;
