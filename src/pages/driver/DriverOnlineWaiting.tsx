import { Radio, Loader2 } from "lucide-react";

const DriverOnlineWaiting = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* Status Indicator */}
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Radio className="h-8 w-8 text-green-600" />
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">You’re online</h2>
        <p className="text-muted-foreground max-w-sm">
          Waiting for nearby ride requests. Stay available.
        </p>
      </div>

      {/* Subtle loader */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Listening for requests</span>
      </div>
    </div>
  );
};

export default DriverOnlineWaiting;
