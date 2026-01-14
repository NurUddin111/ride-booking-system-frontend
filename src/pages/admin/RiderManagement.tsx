import RiderTable from "./RiderTable";

const RiderManagement = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Rider Management
          </h1>
          <p className="text-muted-foreground">
            View and control all riders
          </p>
        </div>

        <RiderTable />
      </div>
    </div>
  );
};

export default RiderManagement;
