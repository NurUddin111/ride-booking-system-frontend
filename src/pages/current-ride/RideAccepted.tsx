import { Car, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IUser } from "@/types/user";
import { useCancelRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const RideAccepted = ({
  driver,
  eta,
  rideId,
}: {
  driver: IUser;
  eta: number;
  rideId: string;
}) => {
  const [cancelRide] = useCancelRideMutation();
  const handleCancel = async () => {
    try {
      await cancelRide(rideId).unwrap();
      toast.warning("Ride cancelled successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Car className="h-8 w-8 text-primary" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Driver Assigned</h2>
        <p className="text-muted-foreground">Your driver is on the way.</p>
      </div>

      <div className="rounded-xl border p-4 text-left space-y-2">
        <p>
          <strong>Driver:</strong> {driver.name}
        </p>
        <p>
          <strong>Phone:</strong> {driver.phone ? driver.phone : "N/A"}
        </p>
        <p>
          <strong>Vehicle:</strong> {driver.vehicleInfo?.vehicleType}
        </p>
        <p>
          <strong>Number Plate:</strong>{" "}
          {driver.vehicleInfo?.vehicleNumberPlate}
        </p>
        <p>
          <strong>ETA:</strong> {eta} minutes
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="outline">
          <Phone className="mr-2 h-4 w-4" />
          Call Driver
        </Button>
        <Button variant="destructive" onClick={handleCancel}>
          Cancel Ride
        </Button>
      </div>
    </div>
  );
};

export default RideAccepted;
