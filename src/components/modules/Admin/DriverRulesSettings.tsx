import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DriverRulesSettings = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Driver Rules</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input placeholder="Minimum Rating (e.g. 3.5)" />
        <Input placeholder="Max Cancellations / Week" />
        <Input placeholder="Auto Suspend (Yes / No)" />

        <Button>Save Driver Rules</Button>
      </CardContent>
    </Card>
  );
};

export default DriverRulesSettings;
