import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const VehicleArrived = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <MapPin className="h-8 w-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Vehicle Arrived</h2>
        <p className="text-muted-foreground">
          Your driver has arrived at the pickup location.
        </p>
      </div>

      <Button variant="outline">Contact Driver</Button>
    </div>
  );
};

export default VehicleArrived;
