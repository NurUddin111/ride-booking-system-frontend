import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, XCircle, ChevronDown, Trash } from "lucide-react";
import { useLocation } from "react-router";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { IUser } from "@/types/user";
import { Button } from "@/components/ui/button";

const ViewSingleUserProfile = () => {
  const [isVehicleInfoOpen, setIsVehicleInfoOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const location = useLocation();
  const user = location.state?.user as IUser;
  console.log(user);

  const getStatusBadge = (
    isApproved: boolean | undefined,
    isOnline: boolean | undefined
  ) => {
    if (!isApproved) {
      return (
        <Badge variant="destructive">
          <Clock className="h-4 w-4 mr-1" /> Pending
        </Badge>
      );
    }
    if (isApproved && isOnline) {
      return (
        <div className="flex gap-1 items-center">
          <Badge variant="default">
            <CheckCircle className="h-4 w-4 mr-1" /> Approved
          </Badge>
          <Badge variant="default" className="bg-green-500">
            Online
          </Badge>
        </div>
      );
    }
    if (isApproved && !isOnline) {
      return (
        <div className="flex gap-2 items-center">
          <Badge variant="default">
            <CheckCircle className="h-4 w-4 mr-1" /> Approved
          </Badge>
          <Badge variant="default" className="bg-muted-foreground">
            Offline
          </Badge>
        </div>
      );
    }

    if (isOnline === false) {
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-500">
          Online
        </Badge>
      );
    }
    if (!isOnline) {
      return <Badge variant="destructive">Offline</Badge>;
    }
    return null;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarImage
            src={user.picture}
            alt={`${user.name}'s profile picture`}
          />
          <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4 text-2xl font-bold">{user.name}</CardTitle>
        <CardDescription className="mt-1 flex flex-col items-center">
          <span>{user.email}</span>
          <div className="mt-2 flex items-center space-x-2">
            {user.role && (
              <Badge
                variant="outline"
                className="capitalize bg-green-500 text-white"
              >
                {user.role}
              </Badge>
            )}
            {user.role === "DRIVER" &&
              getStatusBadge(user.isDriverApproved, user.isOnline)}
            {user.isVerified && (
              <Badge variant="default">
                <CheckCircle className="h-4 w-4 mr-1" /> Verified
              </Badge>
            )}
            {!user.isVerified && (
              <Badge variant="destructive">
                <XCircle className="h-4 w-4 mr-1" /> Unverified
              </Badge>
            )}
            {user.isActive && (
              <Badge variant="outline" className="bg-sky-700 text-white">
                {user.isActive}
              </Badge>
            )}
            {user.isDeleted && (
              <Badge variant="destructive">
                <Trash className="h-4 w-4 mr-1" />
                Deleted
              </Badge>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{user.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{user.address || "N/A"}</p>
          </div>
        </div>
        <Separator />

        {/* Vehicle Information (for drivers) */}

        {user.role === "DRIVER" && (
          <Collapsible
            open={isVehicleInfoOpen}
            onOpenChange={setIsVehicleInfoOpen}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="font-semibold text-lg">Vehicle Information</h3>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isVehicleInfoOpen && "rotate-180"
                  )}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Vehicle Type</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.vehicleType || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle Model</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.brand || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Number Plate</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.vehicleNumberPlate || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Location</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.vehicleLocation?.address || "N/A"}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {user.role === "DRIVER" && (
          <Collapsible open={isDocumentsOpen} onOpenChange={setIsDocumentsOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer mt-4">
                <h3 className="font-semibold text-lg">Documents</h3>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isDocumentsOpen && "rotate-180"
                  )}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Driving License</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.documents.drivingLicense || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">NID / Passport</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.documents.nidOrPassport || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle Registration</p>
                  <p className="font-medium">
                    {user.vehicleInfo?.documents.vehicleRegistration || "N/A"}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        <Separator />

        {/* Other Details */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Other Information</h3>
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">
              {user.createdAt?.date
                ? new Date(user.createdAt.date).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          {user.penalties !== undefined && (
            <div>
              <p className="text-sm text-gray-500">Penalties</p>
              <p className="font-medium">
                {user.penalties ? user.penalties : "00"}
              </p>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewSingleUserProfile;
