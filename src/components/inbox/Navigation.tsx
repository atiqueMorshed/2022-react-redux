import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import logoImage from "../../assets/images/logo-dark.svg";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(userLoggedOut());
		localStorage.removeItem("chat-auth");
	};

	return (
		<nav className="sticky top-0 z-40 transition-colors border-b border-general bg-violet-700">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center justify-between h-16">
					<Link to="/">
						<img className="h-10" src={logoImage} alt="Learn with Sumit" />
					</Link>
					<ul>
						<li className="text-white">
							<span className="cursor-pointer" onClick={logout}>
								Logout
							</span>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
