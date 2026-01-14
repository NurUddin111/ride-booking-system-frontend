/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DriverReviewModal = ({
  open,
  onClose,
  driver,
  onApprove,
  onReject,
}: any) => {
  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-bold">Driver Application</h3>
        </DialogHeader>
        <DialogTitle className="sr-only">Driver Review Modal</DialogTitle>

        <p>Name: {driver.name}</p>
        <p>Vehicle Type: {driver?.vehicleInfo?.vehicleType}</p>
        <p>Brand: {driver?.vehicleInfo?.brand}</p>
        <p>Number Plate: {driver?.vehicleInfo?.vehicleNumberPlate}</p>
        <p>NID/Passport: {driver?.vehicleInfo?.documents?.nidOrPassport}</p>
        <p>Driving License: {driver?.vehicleInfo?.documents?.drivingLicense}</p>
        <p>
          Vehicle Reg: {driver?.vehicleInfo?.documents?.vehicleRegistration}
        </p>

        <div className="flex gap-2 mt-4">
          <Button onClick={onApprove}>Approve</Button>
          <Button variant="destructive" onClick={onReject}>
            Reject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DriverReviewModal;
