import type { IUser } from "@/types/user";
import DriverOnlineWaiting from "./DriverOnlineWaiting";
import DriverRideAccepted from "./DriverRideAccepted";
import DriverRideOngoing from "./DriverRideOngoing";
import DriverRideRequest from "./DriverRideRequest";
import DriverVehicleArrived from "./DriverVehicleArrived";
import GoOnline from "./GoOnline";
import {
  useDriverStatusQuery,
  useRideRequestsQuery,
} from "@/redux/features/ride/ride.api";
import type { IRide } from "@/types/ride";
import RideDetailsLoader from "@/components/modules/Rides/RideDetailsLoader";

export const DriverHome = ({ driver }: { driver: IUser }) => {
  console.log(driver);
  const { data, isLoading: loadingPendingRequests } = useRideRequestsQuery(
    undefined,
    driver?.isOnline === true
      ? {
          pollingInterval: 5000,
          skipPollingIfUnfocused: true,
        }
      : {}
  );
  const { data: driverStatus, isLoading: driverStatusLoading } =
    useDriverStatusQuery(
      undefined,
      driver?.isOnline === true
        ? {
            pollingInterval: 5000,
            skipPollingIfUnfocused: true,
          }
        : {}
    );
  console.log(driverStatus);
  const activeRide = driverStatus?.data?.isDriverBusy as IRide;
  const rider = driverStatus?.data?.rider as IUser;

  const pendingRequests = data?.data?.rideRequests as IRide[];
  console.log(pendingRequests);
  console.log(data);
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      {!driver.isOnline && <GoOnline />}
      {driver.isOnline && pendingRequests?.length === 0 && !activeRide && (
        <DriverOnlineWaiting />
      )}
      {driver.isOnline && pendingRequests?.length > 0 && !activeRide && (
        <DriverRideRequest rideRequests={pendingRequests} />
      )}
      {activeRide && activeRide.status === "ACCEPTED" && (
        <DriverRideAccepted ride={activeRide} rider={rider} />
      )}

      {activeRide && activeRide.status === "VEHICLE_ARRIVED" && (
        <DriverVehicleArrived rideId={activeRide._id} riderName={rider.name} />
      )}

      {activeRide && activeRide.status === "ONGOING" && (
        <DriverRideOngoing ride={activeRide} />
      )}
      {(loadingPendingRequests || driverStatusLoading) && <RideDetailsLoader />}
    </main>
  );
};
