import React from "react";
import Pagination from "../components/Pagination/Pagination";
import Tags from "../components/Tags/Tags";
import VideoGrid from "../components/VideoGrid/VideoGrid";

const Home = () => {
	return (
		<div className="App">
			<Tags />
			<VideoGrid />
			<Pagination />
		</div>
	);
};

export default Home;
