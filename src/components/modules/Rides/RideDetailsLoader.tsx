import { Skeleton } from "@/components/ui/skeleton";

const RideDetailsLoader = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-6 w-40" />
        <Skeleton className="mx-auto h-4 w-64" />
      </div>

      {/* Destination Card */}
      <div className="rounded-xl border p-4 space-y-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Status line */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Action Button */}
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
};

export default RideDetailsLoader;
