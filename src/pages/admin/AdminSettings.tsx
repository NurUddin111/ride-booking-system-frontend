import DriverRulesSettings from "@/components/modules/Admin/DriverRulesSettings";
import FareSettings from "@/components/modules/Admin/FareSettings";
import GeneralSettings from "@/components/modules/Admin/GeneralSettings";
import SecuritySettings from "@/components/modules/Admin/SecuritySettings";

const AdminSettings = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration</p>
        </div>

        <GeneralSettings />
        <FareSettings />
        <DriverRulesSettings />
        <SecuritySettings />
      </div>
    </div>
  );
};

export default AdminSettings;
