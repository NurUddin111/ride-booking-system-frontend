import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  cancelledBy?: "RIDER" | "DRIVER";
};

const RideCancelled = ({ cancelledBy = "RIDER" }: Props) => {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <XCircle className="h-8 w-8 text-red-600" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Ride Cancelled</h2>
        <p className="text-muted-foreground">
          {cancelledBy === "RIDER"
            ? "You cancelled this ride."
            : "The driver cancelled this ride."}
        </p>
      </div>

      <Button>Request a New Ride</Button>
    </div>
  );
};

export default RideCancelled;
