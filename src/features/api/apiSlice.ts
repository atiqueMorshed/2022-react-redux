import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VideoType, VideosType } from "../types";
// We are considering every API in our application into this one slice.
// We can have other redux related slices in application, but this slice is only for all the APIs.

export const apiSlice = createApi({
	reducerPath: "api", // The default value is "api" but we can give custom name. It is like the name field for createSlice.
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9000",
	}),
	endpoints: (builder) => ({
		getVideos: builder.query<VideosType, void>({
			query: () => "/videos",
		}),
		getVideo: builder.query<VideoType, string>({
			query: (id) => `/videos/${id}`,
		}),
	}),
});

export const { useGetVideosQuery, useGetVideoQuery } = apiSlice;
