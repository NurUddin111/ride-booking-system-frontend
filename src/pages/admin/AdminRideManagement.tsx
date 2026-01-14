import RideFilters from "./RideFilter";
import RideTable from "./RideTable";

const RideManagement = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Ride Management</h1>
          <p className="text-muted-foreground">
            View, filter and manage all rides
          </p>
        </div>

        {/* Filters */}
        <RideFilters />

        {/* Table */}
        <RideTable />
      </div>
    </div>
  );
};

export default RideManagement;
