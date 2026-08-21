import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi, User } from "./mockServer";

export const apiSlice = createApi({
    reducerPath: 'api',                 //This tells RTK Query what key it should use in the Redux store.
    baseQuery: fetchBaseQuery({         //baseQuery defines how RTK Query communicates with the server.
        baseUrl: '/',                   //fetchBaseQuery is a lightweight wrapper around the browser's fetch().
    }),
    tagTypes: ["User", "Post"],

    endpoints: (builder) => ({          //we define the operations our API provides.
        getUsers: builder.query<User[], void>({       //getUsers is one endpoint & boilder.query() is use for data fetching
            queryFn: async () => {      //This tells RTK query to fetch data from mockApi's getUsers function instead pf HTTPs request
                const users = await mockApi.getUsers()
                return { data: users }
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "User" as const, id })),
                        { type: "User" as const, id: "LIST" },
                    ]
                    : [{ type: "User" as const, id: "LIST" }],
        }),

        createUser: builder.mutation<User, Omit<User, "id">>({
            queryFn: async (user) => {
                const newUser = await mockApi.createUser(user)
                return { data: newUser }
            },

            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
    })
})

export const { useGetUsersQuery, useCreateUserMutation } = apiSlice