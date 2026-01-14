import { CheckCircle, Wallet, ArrowUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DriverRideCompleted = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Ride Completed</h2>
        <p className="text-muted-foreground">
          Great job! The ride has been successfully completed.
        </p>
      </div>

      {/* Earnings Summary */}
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Wallet className="h-5 w-5 text-primary" />
          <p className="font-medium">Earnings Summary</p>
        </div>

        <div className="flex justify-between text-sm">
          <span>Trip fare</span>
          <span>৳320</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Platform fee</span>
          <span>- ৳20</span>
        </div>

        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total earned</span>
          <span>৳300</span>
        </div>
      </div>

      {/* Action */}
      <Button size="lg" className="w-full">
        <ArrowUpCircle className="mr-2 h-5 w-5" />
        Go Online
      </Button>
    </div>
  );
};

export default DriverRideCompleted;
