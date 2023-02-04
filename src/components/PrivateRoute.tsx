import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type iProps = {
	children: JSX.Element;
};

const PrivateRoute = ({ children }: iProps) => {
	const isLoggedIn = useAuth();

	return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
