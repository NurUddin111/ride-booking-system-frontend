import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Security</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input type="password" placeholder="Current Password" />
        <Input type="password" placeholder="New Password" />
        <Input type="password" placeholder="Confirm New Password" />

        <Button variant="destructive">Change Password</Button>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
