import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import searchIcon from "../../assets/search.svg";
import { searchVideos } from "../../features/filter/filterSlice";

const Navbar = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const match = useMatch("/"); // returns boolean
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(searchVideos(searchTerm));
	}, [dispatch, searchTerm, match, navigate]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// If not searching from homepage, redirect to homepage
		if (!match) navigate("/");
	};

	return (
		<nav className="shadow-md bg-slate-100">
			<div className="flex items-center justify-between px-5 py-3 mx-auto max-w-7xl lg:px-0">
				<Link to="/" className="text-xl font-medium">
					Redux Toolkit
				</Link>
				<div className="flex items-center h-10 px-5 text-sm bg-white border rounded-lg border-slate-200 ring-emerald-200">
					<form onSubmit={handleSubmit}>
						<input
							className="mr-2 border-none outline-none"
							type="search"
							name="search"
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</form>
					<img
						className="inline h-4 cursor-pointer"
						src={searchIcon}
						alt="Search"
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
