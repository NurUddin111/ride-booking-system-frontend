interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

interface IDocuments {
  drivingLicense: string;
  nidOrPassport: string;
  vehicleRegistration: string;
}

interface IVehicleInfo {
  vehicleType: string;
  brand: string;
  vehicleNumberPlate: string;
  vehicleLocation: {
    coordinates: {
      lng: number;
      lat: number;
    };
    address: string;
  };
  documents: IDocuments;
}

interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  address?: string;
  role?: string;
  vehicleInfo?: IVehicleInfo;
  isDriverApproved?: boolean;
  isDeleted?: boolean;
  isActive?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  auths: IAuthProvider[];
  penalties?: number;
  bookings?: string[];
  createdAt?: { date: string; time: string };
}

type DeleteUserModalProps = {
  deleteUserHandler: (bookId: string) => void;
  id: string;
};

export type { IUser, DeleteUserModalProps };
