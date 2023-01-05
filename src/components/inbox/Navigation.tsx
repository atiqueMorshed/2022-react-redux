import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo-dark.svg";

export default function Navigation() {
	return (
		<nav className="sticky top-0 z-40 transition-colors border-b border-general bg-violet-700">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center justify-between h-16">
					<Link to="/">
						<img className="h-10" src={logoImage} alt="Learn with Sumit" />
					</Link>
					<ul>
						<li className="text-white">
							<a href="#">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
