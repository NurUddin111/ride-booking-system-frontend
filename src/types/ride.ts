export interface IRide {
  _id: string;
  riderId: string;
  totalPassengers: number;
  driverId?: string;
  vehicleType: string;

  pickupLocation: {
    coordinates: {
      lng: number;
      lat: number;
    };
    address?: string;
  };

  destinationLocation: {
    coordinates: {
      lng: number;
      lat: number;
    };
    address?: string;
  };

  status: string;
  destinationDistanceInKm: number;
  pickUpDistanceInKm: number;
  destinationEta: number;
  driverEta: number;
  fareEstimate: {
    min: number;
    max: number;
  };
  rideHistory: {
    requestedAt: Date;
    acceptedAt?: Date;
    vehicleArrivedAt?: Date;
    startedAt?: Date;
    completedAt?: Date;
    travellingTimeInMins?: number;
    totalFare?: number;
    cancelledAt?: Date;
  };
  createdAt: Date;
}
