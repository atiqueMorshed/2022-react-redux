import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type iProps = {
	children: JSX.Element;
};

const PublicRoute = ({ children }: iProps) => {
	const isLoggedIn = useAuth();

	return isLoggedIn ? <Navigate to="/inbox" /> : children;
};

export default PublicRoute;
