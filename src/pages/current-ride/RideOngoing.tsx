import { Navigation, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IRide } from "@/types/ride";

const RideOngoing = ({ ride }: { ride: IRide }) => {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <Navigation className="h-8 w-8 text-blue-600" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">On the Way</h2>
        <p className="text-muted-foreground">
          Enjoy your ride. You are heading to your destination.
        </p>
      </div>

      <div className="rounded-xl border p-4">
        <p>
          <strong>Distance remaining:</strong> {ride.destinationDistanceInKm} km
        </p>
        <p>
          <strong>Estimated time:</strong> {ride.destinationEta} minutes
        </p>
      </div>

      <Button variant="outline">
        <ShieldAlert className="mr-2 h-4 w-4" />
        Emergency
      </Button>
    </div>
  );
};

export default RideOngoing;
