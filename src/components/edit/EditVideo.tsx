import { useNavigate, useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Form from "./Form";

export default function EditVideo() {
	const { videoId } = useParams();
	const navigate = useNavigate();

	const {
		data: video,
		isLoading,
		isError,
		isSuccess,
	} = useGetVideoQuery(videoId || "invalid-id");

	let content = null;

	if (isLoading) {
		content = <div>Loading...</div>;
	}
	if (!isLoading && isError) {
		content = <Error message="There was an error!" />;
	}
	if (isSuccess && video?.id) {
		content = <Form video={video} />;
	}

	if (!video?.id) navigate("/");

	return (
		<div className="px-5 mx-auto max-w-7xl lg:px-0">
			<div className="w-full">
				<div className="px-4 pb-4 sm:px-0">
					<h3 className="text-lg font-medium leading-6 text-gray-900">
						Edit video
					</h3>
					<p className="mt-1 text-sm text-gray-600">
						Please fillup the form to edit video
					</p>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">{content}</div>
			</div>
		</div>
	);
}
