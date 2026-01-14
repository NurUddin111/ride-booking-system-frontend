import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">General Settings</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input disabled value="Safari Ride" />
        <Input placeholder="Support Email" />
        <Input placeholder="Support Phone" />

        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
