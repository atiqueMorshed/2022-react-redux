import React from "react";
type IProp = {
	error?: string;
};
const BasicError = ({ error }: IProp) => {
	return (
		<div className="col-span-12 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px] flex justify-center items-center text-red-500 text-xl font-bold">
			{error}
		</div>
	);
};

export default BasicError;
