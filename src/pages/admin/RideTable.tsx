/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import RideDetailsModal from "./RideDetailsModal";

const rides = [
  {
    id: "RID-2001",
    rider: "Rahim",
    driver: "Karim",
    status: "ongoing",
    fare: "৳350",
    date: "Today",
    pickup: "Dhanmondi",
    dropoff: "Gulshan",
  },
  {
    id: "RID-2002",
    rider: "Sajid",
    driver: "Hasan",
    status: "completed",
    fare: "৳420",
    date: "Today",
    pickup: "Mirpur",
    dropoff: "Banani",
  },
];

// const statusVariant = {
//   ongoing: "secondary",
//   completed: "success",
//   cancelled: "destructive",
// } as const;

const RideTable = () => {
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">All Rides</h3>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ride ID</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rides.map((ride) => (
                <TableRow key={ride.id} className="hover:bg-muted/50">
                  <TableCell>{ride.id}</TableCell>
                  <TableCell>{ride.rider}</TableCell>
                  <TableCell>{ride.driver}</TableCell>
                  <TableCell>
                    <Badge variant="default">{ride.status}</Badge>
                  </TableCell>
                  <TableCell>{ride.fare}</TableCell>
                  <TableCell>{ride.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRide(ride);
                        setOpen(true);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <RideDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        ride={selectedRide}
      />
    </>
  );
};

export default RideTable;
