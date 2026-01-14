import { MapPin, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IRide } from "@/types/ride";
import { useAcceptRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const DriverRideRequest = ({ rideRequests }: { rideRequests: IRide[] }) => {
  const [accepetRide, { isLoading, isError }] = useAcceptRideMutation();
  const handleAccept = async (rideId: string) => {
    try {
      await accepetRide(rideId).unwrap();
      toast.success("Ride accepted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept ride!");
    }
  };
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">New Ride Requests</h2>
        <p className="text-muted-foreground">Riders nearby needs a ride.</p>
      </div>

      {rideRequests?.map((rideReq) => (
        <>
          <div className="border p-4 rounded-xl">
            {/* Ride Info Card */}
            <div className="p-4 space-y-4">
              {/* Pickup */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium">
                    {rideReq.pickupLocation.address}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Drop */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Drop-off</p>
                  <p className="font-medium">
                    {rideReq.destinationLocation.address}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex justify-between pt-2 text-sm">
                <span>
                  <strong>Fare:</strong> ৳ {rideReq.fareEstimate.min}
                </span>
                <span>
                  <strong>Distance:</strong> {rideReq.destinationDistanceInKm}{" "}
                  km
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="destructive" className="flex-1" disabled>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>

              <Button
                className="flex-1"
                onClick={() => handleAccept(rideReq._id)}
                disabled={isLoading}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {isLoading ? "Accepting..." : "Accept"}
              </Button>
            </div>
            {isError && <p className="text-red-700">Failed to accept ride</p>}
          </div>
        </>
      ))}
    </div>
  );
};

export default DriverRideRequest;
