import { useActiveRideQuery } from "@/redux/features/ride/ride.api";
import RideAccepted from "../current-ride/RideAccepted";
import RideCancelled from "../current-ride/RideCancelled";
import RideCompleted from "../current-ride/RideCompleted";
import RideOngoing from "../current-ride/RideOngoing";
import NoRideHome from "./NoRideHome";
import SearchingDriverLoader from "./SearchingDriverLoader";
import type { IRide } from "@/types/ride";
import VehicleArrived from "../current-ride/VerhicleArrived";
import ActiveRideError from "../current-ride/ActiveRideError";
import type { IUser } from "@/types/user";

const RiderHome = () => {
  const { isLoading, isError, data, refetch } = useActiveRideQuery(undefined, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
  });
  const ride = data?.data?.activeRide as IRide;
  const driver = data?.data?.driver as IUser;
  const status = ride?.status;

  console.log(ride);
  console.log(driver);
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      {isLoading && <NoRideHome />}
      {!isLoading && !ride && <NoRideHome />}
      {isError && <ActiveRideError onRetry={refetch} />}
      {status === "PENDING" && <SearchingDriverLoader id={ride._id} />}
      {status === "ACCEPTED" && (
        <RideAccepted driver={driver} eta={ride.driverEta} rideId={ride._id}/>
      )}
      {status === "VEHICLE_ARRIVED" && <VehicleArrived />}
      {status === "ONGOING" && <RideOngoing ride={ride} />}
      {status === "COMPLETED" && <RideCompleted />}
      {status === "CANCELLED_BY_RIDER" && <RideCancelled cancelledBy="RIDER" />}
      {status === "CANCELLED_BY_DRIVER" && (
        <RideCancelled cancelledBy="DRIVER" />
      )}
    </main>
  );
};

export default RiderHome;
