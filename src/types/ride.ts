export interface IRide {
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
  distanceInKm: number;
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
