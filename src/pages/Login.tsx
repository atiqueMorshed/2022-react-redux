import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo-light.svg";
import Error from "../components/ui/Error";

export default function Login() {
	return (
		<div className="grid place-items-center h-screen bg-[#F9FAFB">
			<div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<Link to="/">
							<img
								className="w-auto h-12 mx-auto"
								src={logoImage}
								alt="Learn with sumit"
							/>
						</Link>
						<h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
							Sign in to your account
						</h2>
					</div>
					<form className="mt-8 space-y-6" action="#" method="POST">
						<input type="hidden" name="remember" value="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-end">
							<div className="text-sm">
								<Link
									to="/register"
									className="font-medium text-violet-600 hover:text-violet-500"
								>
									Register
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
							>
								Sign in
							</button>
						</div>

						<Error message="There was an error" />
					</form>
				</div>
			</div>
		</div>
	);
}
