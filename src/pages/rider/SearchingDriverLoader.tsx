import { Loader2, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCancelRideMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";

const SearchingDriverLoader = ({ id }: { id: string }) => {
  const [cancelRide] = useCancelRideMutation();
  const handleCancel = async () => {
    try {
      await cancelRide(id).unwrap();
      toast.warning("Ride cancelled successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* Animated Icon */}
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Car className="h-10 w-10 text-primary" />
        </div>
        <Loader2 className="absolute -bottom-2 -right-2 h-6 w-6 animate-spin text-primary" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Finding a driver…</h2>
        <p className="text-muted-foreground max-w-sm">
          Please wait while we connect you with a nearby driver.
        </p>
      </div>

      <Button variant="outline" onClick={handleCancel}>
        Cancel Ride
      </Button>
    </div>
  );
};

export default SearchingDriverLoader;
