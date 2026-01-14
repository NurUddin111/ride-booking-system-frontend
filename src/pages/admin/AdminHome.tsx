import AdminRecentRides from "./AdminRecentRides";
import AdminStats from "./AdminStats";

const AdminHome = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor rides, drivers & system activity
          </p>
        </div>

        <AdminStats />
        <AdminRecentRides />
      </div>
    </div>
  );
};

export default AdminHome;
