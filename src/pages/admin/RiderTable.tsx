import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const riders = [
  {
    id: "RIDR-101",
    name: "Rahim",
    phone: "017xxxx",
    totalRides: 35,
    status: "active",
  },
  {
    id: "RIDR-102",
    name: "Sajid",
    phone: "018xxxx",
    totalRides: 12,
    status: "blocked",
  },
  {
    id: "RIDR-103",
    name: "Nabila",
    phone: "019xxxx",
    totalRides: 58,
    status: "active",
  },
];

// const statusVariant = {
//   active: "success",
//   blocked: "destructive",
// } as const;

const RiderTable = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">All Riders</h3>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rider ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Rides</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {riders.map((rider) => (
              <TableRow key={rider.id} className="hover:bg-muted/50">
                <TableCell>{rider.id}</TableCell>
                <TableCell>{rider.name}</TableCell>
                <TableCell>{rider.phone}</TableCell>
                <TableCell>{rider.totalRides}</TableCell>
                <TableCell>
                  <Badge variant="outline">{rider.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {rider.status === "active" ? (
                    <Button size="sm" variant="destructive">
                      Block
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary">
                      Unblock
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RiderTable;
