import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const RideCompleted = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Ride Completed</h2>
        <p className="text-muted-foreground">Thanks for riding with Safari.</p>
      </div>

      <div className="rounded-xl border p-4 space-y-1">
        <p>
          <strong>Total Fare:</strong> ৳350
        </p>
        <p>
          <strong>Payment:</strong> Completed
        </p>
      </div>

      <Button>
        <Star className="mr-2 h-4 w-4" />
        Rate Driver
      </Button>
    </div>
  );
};

export default RideCompleted;
