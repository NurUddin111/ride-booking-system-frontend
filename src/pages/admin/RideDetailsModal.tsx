import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Ride = {
  id: string;
  rider: string;
  driver: string;
  status: "ongoing" | "completed" | "cancelled";
  fare: string;
  date: string;
  pickup: string;
  dropoff: string;
};

// const statusVariant = {
//   ongoing: "secondary",
//   completed: "success",
//   cancelled: "destructive",
// } as const;

type Props = {
  open: boolean;
  onClose: () => void;
  ride: Ride | null;
};

const RideDetailsModal = ({ open, onClose, ride }: Props) => {
  if (!ride) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ride Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ride ID</span>
            <span className="font-medium">{ride.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="default">{ride.status}</Badge>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Rider</span>
            <span>{ride.rider}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Driver</span>
            <span>{ride.driver}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Pickup</span>
            <span>{ride.pickup}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Dropoff</span>
            <span>{ride.dropoff}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Fare</span>
            <span>{ride.fare}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>{ride.date}</span>
          </div>

          {/* Future actions */}
          {ride.status === "ongoing" && (
            <Button variant="destructive" className="w-full">
              Force Cancel Ride
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RideDetailsModal;
