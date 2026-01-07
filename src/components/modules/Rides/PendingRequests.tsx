import Loader from "@/components/layout/Loader";
import StaggeredLetter from "@/components/ui/staggered-letter";
import { useRideRequestsQuery } from "@/redux/features/ride/ride.api";
import { motion } from "framer-motion";
import { CircleAlert } from "lucide-react";

const PendingRequests = () => {
  const { data, isLoading, isError } = useRideRequestsQuery(undefined);
  console.log(data?.data?.rideRequests);
  const pendingRideReq = data?.data?.rideRequests;
  return (
    <div>
      <div className="text-4xl text-center font-bold my-5">
        <StaggeredLetter />
      </div>
      {isLoading && <Loader />}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
        >
          <CircleAlert className="h-4 w-4" />
          <span>Failed to load Pending Ride Requests</span>
        </motion.div>
      )}

      {!isLoading && !isError && Array.isArray(pendingRideReq) && (
        <>
          <h1>Hello</h1>
        </>
      )}
      
      {/* {!isLoading && !isError && Array.isArray(pendingRideReq) && (
        <>
          {pendingRideReq.map((ride) => (
            <div key={ride._id} className="border border-gray-300 rounded-2xl m-5 p-3">
              <div>
                <h1>Pickup : {ride.pickupLocation.address}</h1>
                <h1>Destination : {ride.destinationLocation.address}</h1>
                <h1>Distance : {ride.distanceInKm} km</h1>
              </div>
            </div>
          ))}
        </>
      )} */}
    </div>
  );
};

export default PendingRequests;
