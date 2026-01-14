import { MapPin, User, Navigation, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IRide } from "@/types/ride";
import type { IUser } from "@/types/user";
import {
  useCancelRideMutation,
  useUpdateRideMutation,
} from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const DriverRideAccepted = ({ ride, rider }: { ride: IRide; rider: IUser }) => {
  const [cancelRide, { isLoading: cancellingRide }] = useCancelRideMutation();
  const [updateRide, { isLoading: updatingStatus }] = useUpdateRideMutation();
  const handleCancel = async () => {
    try {
      await cancelRide(ride._id).unwrap();
      toast.warning("Ride cancelled successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateRide = async () => {
    try {
      const updateDetails = {
        status: "VEHICLE_ARRIVED",
      };
      await updateRide({ id: ride._id, updateDetails }).unwrap();
      toast.success("Ride status updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update ride status!");
    }
  };
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Ride Accepted</h2>
        <p className="text-muted-foreground">Head to the pickup location.</p>
      </div>

      {/* Rider Info */}
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rider</p>
            <p className="font-medium">{rider.name}</p>
          </div>
        </div>
      </div>

      {/* Pickup Location */}
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm text-muted-foreground">Pickup location</p>
            <p className="font-medium">{ride.pickupLocation.address}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <span>
            <strong>Distance:</strong> {ride.pickUpDistanceInKm} km
          </span>
          <span>
            <strong>ETA:</strong> {ride.driverEta} min
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" disabled>
          <Navigation className="mr-2 h-4 w-4" />
          Navigate
        </Button>

        <Button variant="destructive" className="flex-1" onClick={handleCancel}>
          <XCircle className="mr-2 h-4 w-4" />
          {cancellingRide ? "Cancelling..." : "Cancel"}
        </Button>

        <Button className="flex-1" onClick={handleUpdateRide}>
          <CheckCircle className="mr-2 h-4 w-4" />
          {updatingStatus ? "Updating..." : "Arrive"}
        </Button>
      </div>
    </div>
  );
};

export default DriverRideAccepted;
