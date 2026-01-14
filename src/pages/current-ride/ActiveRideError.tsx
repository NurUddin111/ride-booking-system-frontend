import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onRetry?: () => void;
};

const ActiveRideError = ({ onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-sm">
          We couldn’t load your active ride right now. Please try again.
        </p>
      </div>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
};

export default ActiveRideError;
