/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DriverManagementTabs = ({ active, setActive }: any) => {
  return (
    <Tabs value={active} onValueChange={setActive}>
      <TabsList>
        <TabsTrigger value="pending">Pending Drivers</TabsTrigger>
        <TabsTrigger value="approved">Approved Drivers</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DriverManagementTabs;
