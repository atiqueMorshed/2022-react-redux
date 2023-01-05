import { useState } from "react";
import { useEditVideoMutation } from "../../features/api/apiSlice";

import { VideoType } from "../../features/types";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

type iProps = {
	video: VideoType;
};

const Form = ({ video: previousVid }: iProps) => {
	const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();

	const [title, setTitle] = useState(previousVid?.title);
	const [author, setAuthor] = useState(previousVid?.author);
	const [description, setDescription] = useState(previousVid?.description);
	const [link, setLink] = useState(previousVid?.link);
	const [thumbnail, setThumbnail] = useState(previousVid?.thumbnail);
	const [tagString, setTagString] = useState(previousVid?.tags.join(","));
	const [duration, setDuration] = useState(previousVid?.duration);
	const [views, setViews] = useState(previousVid?.views);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!previousVid?.id ||
			!title ||
			!author ||
			!description ||
			!link ||
			!thumbnail ||
			!tagString ||
			!duration ||
			!views
		)
			return;
		editVideo({
			id: previousVid.id,
			video: {
				id: previousVid.id,
				title,
				author,
				description,
				link,
				thumbnail,
				tags: tagString.split(","),
				duration,
				views,
				likes: previousVid.likes,
				unlikes: previousVid.unlikes,
				avatar: previousVid.avatar,
				date: previousVid.date,
			},
		});
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
