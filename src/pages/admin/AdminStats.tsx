import { Car, Users, UserCheck, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { title: "Total Rides", value: 1280, icon: Car },
  { title: "Ongoing Rides", value: 24, icon: Car },
  { title: "Active Drivers", value: 86, icon: UserCheck },
  { title: "Active Riders", value: 540, icon: Users },
  { title: "Completed Rides", value: 1190, icon: Car },
  { title: "Cancelled Rides", value: 90, icon: XCircle },
];

const AdminStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <Card key={item.title} className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <h2 className="text-3xl font-bold tracking-tight">
                {item.value}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <item.icon className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
