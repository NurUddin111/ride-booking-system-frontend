import AdminSidebar from "@/pages/admin/AdminSideBar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types/user";
import { Outlet, useNavigate } from "react-router";
import RideDetailsLoader from "../modules/Rides/RideDetailsLoader";

const AdminLayout = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data?.data as IUser;
  const navigate = useNavigate();

  return (
    <>
      {isLoading && (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
          <RideDetailsLoader />
        </div>
      )}
      {!isLoading && user?.role === "ADMIN" && (
        <div className="min-h-screen flex bg-muted/40">
          <AdminSidebar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      )}
      {!isLoading && user?.role !== "ADMIN" && navigate("/")}
    </>
  );
};

export default AdminLayout;
