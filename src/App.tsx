import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Video from "./Pages/Video";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/video/:videoId" element={<Video />} />
			</Routes>{" "}
			<Footer />
		</div>
	);
}

export default App;
