import { nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import { EditVideoIProp, VideoType, VideosType } from "../types";
// We are considering every API in our application into this one slice.
// We can have other redux related slices in application, but this slice is only for all the APIs.

export const apiSlice = createApi({
	reducerPath: "api", // The default value is "api" but we can give custom name. It is like the name field for createSlice.
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9000",
	}),
	tagTypes: ["Videos", "RelatedVideos", "Video"], // Whitelist for tags. Only these tags can be used as types in providesTags and for invalidations.
	endpoints: (builder) => ({
		getVideos: builder.query<VideosType, void>({
			query: () => "/videos",
			keepUnusedDataFor: 600, // By default, rehydartion  will not happen for 60 seconds. (takes in values in seconds)
			providesTags: ["Videos"],
			/*
			Used by query endpoints. Determines which 'tag' is attached to the cached data returned by the query. Expects an array of tag type strings, an array of objects of tag types with ids, or a function that returns such an array.
			['Post'] - equivalent to 2
			[{ type: 'Post' }] - equivalent to 1
			[{ type: 'Post', id: 1 }]
			(result, error, arg) => ['Post'] - equivalent to 5
			(result, error, arg) => [{ type: 'Post' }] - equivalent to 4
			(result, error, arg) => [{ type: 'Post', id: 1 }]
			 */
		}),
		getVideo: builder.query<VideoType, string>({
			query: (id) => `/videos/${id}`,
			providesTags: (result, error, args) => [{ type: "Video", id: args }],
		}),
		getRelatedVideos: builder.query<VideosType, Pick<VideoType, "id" | "tags">>(
			{
				query: ({ id, tags }) =>
					tags.length > 0
						? "/videos?" +
						  tags.map((tag) => `tags_like=${tag}`).join("&") +
						  `&id_ne=${id}&_limit=5`
						: `/videos?id_ne=${id}&_limit=5`,
				providesTags: (result, error, args) => [
					{ type: "RelatedVideos", id: args.id },
				],
			},
		),
		addVideo: builder.mutation<VideoType, Partial<VideoType>>({
			query: (data) => ({
				url: "/videos",
				method: "POST",
				body: {
					...data,
					id: nanoid(),
					date: moment().format("MMMM d, YYYY"),
					avatar:
						"https://gravatar.com/avatar/7cfb01a6fba2017adbceda0902066a2c?s=400&d=robohash&r=x",
					likes: 0,
					unlikes: 0,
				},
			}),
			invalidatesTags: ["Videos"], // Used by mutation endpoints. Determines which cached data should be either re-fetched or removed from the cache. Expects the same shapes as providesTags.
		}),
		editVideo: builder.mutation<VideoType, EditVideoIProp>({
			query: ({ id, video }) => ({
				url: `/videos/${id}`,
				method: "PATCH",
				body: video,
			}),
			invalidatesTags: (result, error, arg) => [
				"Videos",
				{ type: "RelatedVideos", id: arg.id },
				{ type: "Video", id: arg.id },
			],
		}),
		deleteVideo: builder.mutation<object, Pick<VideoType, "id">>({
			query: ({ id }) => ({
				url: `/videos/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Videos"],
		}),
	}),
});

export const {
	useGetVideosQuery,
	useGetVideoQuery,
	useGetRelatedVideosQuery,
	useAddVideoMutation,
	useEditVideoMutation,
	useDeleteVideoMutation,
} = apiSlice;
