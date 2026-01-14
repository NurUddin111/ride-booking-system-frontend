import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUserRequest: build.mutation({
      query: (userDetails) => ({
        url: "/user/signup",
        method: "POST",
        data: userDetails,
      }),
    }),
    verifyUser: build.mutation({
      query: (otp) => ({
        url: "/user/signup/verify",
        method: "POST",
        data: otp,
      }),
    }),
    signupUser: build.mutation({
      query: (password) => ({
        url: "/user/signup/password",
        method: "POST",
        data: password,
      }),
    }),
    userInfo: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    signinUser: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ userId, userDetails }) => ({
        url: `/user/edit-profile/${userId}`,
        method: "PATCH",
        data: userDetails,
      }),
      invalidatesTags: ["User", "Users"],
    }),
    becomeDriver: build.mutation({
      query: ({ userId, vehicleInfo }) => ({
        url: `/user/become-driver/${userId}`,
        method: "PATCH",
        data: vehicleInfo,
      }),
      invalidatesTags: ["User", "Users"],
    }),
    pendingDriver: build.query({
      query: () => ({
        url: "/user/driver-requests",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    approvedDrivers: build.query({
      query: () => ({
        url: "/user/drivers",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    approveDriver: build.mutation({
      query: ({ userId }) => ({
        url: `/user/approve-driver/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Users"],
    }),
    allUsers: build.query({
      query: ({ page = 1 }) => ({
        url: `/user/all?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUserRequestMutation,
  useVerifyUserMutation,
  useSignupUserMutation,
  useUserInfoQuery,
  useSigninUserMutation,
  useSignoutUserMutation,
  useUpdateUserMutation,
  useBecomeDriverMutation,
  usePendingDriverQuery,
  useApprovedDriversQuery,
  useApproveDriverMutation,
  useDeleteUserMutation,
  useAllUsersQuery,
} = authApi;
