import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const rides = [
  {
    id: "RID-1001",
    rider: "Rahim",
    driver: "Karim",
    status: "ongoing",
    time: "3 min ago",
  },
  {
    id: "RID-1002",
    rider: "Sajid",
    driver: "Hasan",
    status: "completed",
    time: "25 min ago",
  },
  {
    id: "RID-1003",
    rider: "Nabila",
    driver: "Imran",
    status: "cancelled",
    time: "1 hour ago",
  },
];

// const statusVariant = {
//   ongoing: "default",
//   completed: "success",
//   cancelled: "destructive",
// } as const;

const AdminRecentRides = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Rides</h3>
        <span className="text-sm text-muted-foreground">Last activity</span>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ride ID</TableHead>
              <TableHead>Rider</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rides.map((ride) => (
              <TableRow
                key={ride.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell>{ride.id}</TableCell>
                <TableCell>{ride.rider}</TableCell>
                <TableCell>{ride.driver}</TableCell>
                <TableCell>
                  <Badge variant="default">{ride.status}</Badge>
                </TableCell>
                <TableCell>{ride.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminRecentRides;
