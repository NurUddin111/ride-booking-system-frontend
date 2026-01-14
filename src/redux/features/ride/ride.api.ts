import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRide: build.mutation({
      query: (rideDetails) => ({
        url: "/ride/ride-request",
        method: "POST",
        data: rideDetails,
      }),
    }),
    rideRequests: build.query({
      query: () => ({
        url: "/ride/pending-ride-requests",
        method: "GET",
      }),
    }),
    cancelRide: build.mutation({
      query: (id) => ({
        url: `/ride/cancel-ride/${id}`,
        method: "POST",
      }),
    }),
    acceptRide: build.mutation({
      query: (id) => ({
        url: `/ride/accept-ride/${id}`,
        method: "POST",
      }),
    }),
    updateRide: build.mutation({
      query: ({ id, updateDetails }) => ({
        url: `/ride/update-ride/${id}`,
        method: "PUT",
        data: updateDetails,
      }),
    }),
    activeRide: build.query({
      query: () => ({
        url: "/ride/active",
        method: "GET",
      }),
    }),
    driverStatus: build.query({
      query: () => ({
        url: "/ride/driver-status",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateRideMutation,
  useCancelRideMutation,
  useAcceptRideMutation,
  useUpdateRideMutation,
  useRideRequestsQuery,
  useActiveRideQuery,
  useDriverStatusQuery,
} = rideApi;
