import { Link } from "react-router-dom";

export default function Navigation() {
	return (
		<nav className="shadow-md bg-slate-100">
			<div className="flex items-center justify-between px-5 py-3 mx-auto max-w-7xl lg:px-0">
				<Link className="text-2xl font-extrabold text-blue-600" to="/">
					RTK Query
				</Link>
				<Link
					to="/videos/add"
					className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
				>
					+ Add Video
				</Link>
			</div>
		</nav>
	);
}
