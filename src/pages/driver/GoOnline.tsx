import { Power } from "lucide-react";

const GoOnline = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* Status Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Power className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">You are offline</h2>
        <p className="text-muted-foreground max-w-sm">
          Go online to start receiving ride requests from nearby riders.
        </p>
      </div>
    </div>
  );
};

export default GoOnline;
