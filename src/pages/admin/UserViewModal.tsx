/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IUser } from "@/types/user";

const DriverViewModal = ({
  open,
  onClose,
  driver,
}: {
  open: any;
  onClose: any;
  driver: IUser | undefined;
}) => {
  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-bold">Driver Information</h3>
        </DialogHeader>
        <DialogTitle className="sr-only">Driver View Modal</DialogTitle>

        <p>Name: {driver.name}</p>
        <p>Vehicle Type: {driver?.vehicleInfo?.vehicleType}</p>
        <p>Brand: {driver?.vehicleInfo?.brand}</p>
        <p>Number Plate: {driver?.vehicleInfo?.vehicleNumberPlate}</p>
        <p>NID/Passport: {driver?.vehicleInfo?.documents?.nidOrPassport}</p>
        <p>Driving License: {driver?.vehicleInfo?.documents?.drivingLicense}</p>
        <p>
          Vehicle Reg: {driver?.vehicleInfo?.documents?.vehicleRegistration}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DriverViewModal;
