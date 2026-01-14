/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DriverManagementTabs from "./DriverManagementTabs";
import PendingDriverTable from "./PendingDriverTable";
import ApprovedDriverTable from "./ApprovedDriverTable";
import DriverReviewModal from "./DriverApprovalModal";
import {
  useApprovedDriversQuery,
  useApproveDriverMutation,
  usePendingDriverQuery,
} from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types/user";
import { toast } from "sonner";
import DriverViewModal from "./UserViewModal";
import UserLoader from "../UserLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const DriverManagement = () => {
  const [approveDriver] = useApproveDriverMutation();

  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  const [selectedDriver, setSelectedDriver] = useState<IUser>();

  const {
    data: pendingDrivers,
    isLoading: pendingDriversLoading,
    isError: pendingDriversLoadingError,
  } = usePendingDriverQuery(undefined);

  const unapprovedDrivers = pendingDrivers?.data as IUser[];

  const {
    data: approvedDrivers,
    isLoading: approvedDriversLoading,
    isError: approvedDriversLoadingError,
  } = useApprovedDriversQuery(undefined);

  const validDrivers = approvedDrivers?.data as IUser[];

  const [openReview, setOpenReview] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleReview = (driver: any) => {
    setSelectedDriver(driver);
    setOpenReview(true);
  };

  const handleView = (driver: IUser) => {
    setSelectedDriver(driver);
    setOpenView(true);
  };

  const handleApprove = async () => {
    try {
      await approveDriver({ userId: selectedDriver?._id }).unwrap();
      toast.success("Driver Approved");
    } catch (error) {
      console.log(error);
      toast.error("Driver approval failed!");
    }
    setOpenReview(false);
  };

  const handleReject = () => {
    setOpenReview(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Driver Management</h1>
          <p className="text-muted-foreground">Review and approve drivers</p>
        </div>

        {/* Tabs */}
        <DriverManagementTabs active={activeTab} setActive={setActiveTab} />

        {/* Tables */}
        {activeTab === "pending" &&
          (pendingDriversLoading ? (
            <UserLoader />
          ) : (
            <PendingDriverTable
              drivers={unapprovedDrivers}
              onReview={handleReview}
            />
          ))}

        {activeTab === "pending" && pendingDriversLoadingError && (
          <div>
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to driver request List.</AlertTitle>
              <AlertDescription>
                <p>Please try again.</p>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {activeTab === "approved" &&
          (approvedDriversLoading ? (
            <UserLoader />
          ) : (
            <ApprovedDriverTable drivers={validDrivers} onView={handleView} />
          ))}

        {activeTab === "approved" && approvedDriversLoadingError && (
          <div>
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to Load approved drivers List.</AlertTitle>
              <AlertDescription>
                <p>Please try again.</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      <DriverReviewModal
        open={openReview}
        driver={selectedDriver}
        onClose={() => setOpenReview(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* View Modal */}
      <DriverViewModal
        open={openView}
        driver={selectedDriver}
        onClose={() => setOpenView(false)}
      />
    </div>
  );
};

export default DriverManagement;
