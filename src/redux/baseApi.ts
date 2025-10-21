import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1126/api/v1",
    credentials: "include",
  }),
  tagTypes: ["user"],
  endpoints: (build) => ({
    createUserRequest: build.mutation({
      query: (userDetails) => ({
        url: "/user/signup",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["user"],
    }),
    verifyUser: build.mutation({
      query: (otp) => ({
        url: "/user/signup/verify",
        method: "POST",
        body: otp,
      }),
    }),
    signupUser: build.mutation({
      query: (password) => ({
        url: "/user/signup/password",
        method: "POST",
        body: password,
      }),
    }),
  }),
});

export const {
  useCreateUserRequestMutation,
  useVerifyUserMutation,
  useSignupUserMutation,
} = baseApi;
