/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { IUser } from "@/types/user";
import { Button } from "@/components/ui/button";

const ApprovedDriverTable = ({
  drivers,
  onView,
}: {
  drivers: IUser[];
  onView: any;
}) => {
  console.log(drivers);
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Total Rides</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {drivers?.map((d) => (
              <TableRow key={d._id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.phone}</TableCell>
                <TableCell className="text-center">{d.bookings?.length}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{d.isActive}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => onView(d)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ApprovedDriverTable;
