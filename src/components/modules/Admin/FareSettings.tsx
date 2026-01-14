import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FareSettings = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Ride & Fare Settings</h3>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Base Fare (৳)" />
        <Input placeholder="Per KM Fare (৳)" />
        <Input placeholder="Waiting Charge / min (৳)" />
        <Input placeholder="Cancellation Fee (৳)" />
        <Input placeholder="Platform Commission (%)" />

        <div className="md:col-span-2">
          <Button>Update Fare Rules</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FareSettings;
