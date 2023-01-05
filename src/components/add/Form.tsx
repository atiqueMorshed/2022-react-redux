// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

const Form = () => {
	const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [tagString, setTagString] = useState("");
	const [duration, setDuration] = useState("");
	const [views, setViews] = useState("");

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setAuthor("");
		setLink("");
		setThumbnail("");
		setTagString("");
		setDuration("");
		setViews("");
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addVideo({
			title,
			description,
			author,
			link,
			thumbnail,
			tags: tagString.split(","),
			duration,
			views,
		});
		resetForm();
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<div className="overflow-hidden shadow sm:rounded-md">
				<div className="px-4 py-5 bg-white sm:p-6">
					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<TextInput
								title="Video title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<TextInput
								title="Author"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</div>

						<div className="col-span-6">
							<TextArea
								title="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								title="YouTube Video link"
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								title="Thumbnail link"
								value={thumbnail}
								onChange={(e) => setThumbnail(e.target.value)}
							/>
						</div>

						<div className="col-span-6 sm:col-span-6 lg:col-span-2">
							<TextInput
								title="Tags (comma separated)"
								value={tagString}
								onChange={(e) => setTagString(e.target.value)}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								title="Video Duration"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								title="Video no of views"
								value={views}
								onChange={(e) => setViews(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
					<button
						disabled={isLoading}
						type="submit"
						className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>

				{isSuccess && <Success message="Video was added successfully" />}
				{isError && <Error message="There was an error adding video!" />}
			</div>
		</form>
	);
};

export default Form;
