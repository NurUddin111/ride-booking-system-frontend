import { Navigation, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IRide } from "@/types/ride";
import { useUpdateRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const DriverRideOngoing = ({ ride }: { ride: IRide }) => {
  const [
    updateRide,
    { isLoading: updatingStatus, isError: updatingStatusError },
  ] = useUpdateRideMutation();

  const handleUpdateRide = async () => {
    try {
      const updateDetails = {
        status: "COMPLETED",
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
        <h2 className="text-2xl font-semibold">Ride in Progress</h2>
        <p className="text-muted-foreground">
          You are heading to the destination.
        </p>
      </div>

      {/* Destination Info */}
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 text-red-600" />
          <div>
            <p className="text-sm text-muted-foreground">Destination</p>
            <p className="font-medium">{ride.destinationLocation.address}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <span>
            <strong>Distance remaining:</strong> {ride.destinationDistanceInKm}{" "}
            km
          </span>
          <span>
            <strong>ETA:</strong> {ride.destinationEta} min
          </span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Navigation className="h-4 w-4" />
        <span>Navigation in progress</span>
      </div>

      <Button size="lg" className="w-full" onClick={handleUpdateRide}>
        <CheckCircle className="mr-2 h-5 w-5" />
        {updatingStatus ? "Updating..." : "Complete"}
      </Button>
      {updatingStatusError && (
        <>
          <p className="text-red-700">
            "Failed to update status! Please try again!"
          </p>
        </>
      )}
    </div>
  );
};

export default DriverRideOngoing;
