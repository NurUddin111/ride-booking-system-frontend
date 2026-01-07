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
  }),
});

export const { useCreateRideMutation, useRideRequestsQuery } = rideApi;
