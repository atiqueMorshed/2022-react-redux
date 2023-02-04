import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
	const [authCheck, setAuthCheck] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const authUser = localStorage?.getItem("chat-auth");

		if (authUser) {
			const authObject = JSON.parse(authUser);
			if (authObject?.accessToken && authObject?.user) {
				dispatch(
					userLoggedIn({
						accessToken: authObject.accessToken,
						user: authObject?.user,
					}),
				);
			}
		}
		setAuthCheck(true);
	}, [dispatch]);

	return authCheck;
};

export default useAuthCheck;
