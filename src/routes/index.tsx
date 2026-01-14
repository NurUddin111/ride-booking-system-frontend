import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import LoginForm from "@/components/modules/Authentication/LoginForm";
import RegistrationForm from "@/components/modules/Authentication/RegistrationForm";
import PendingRequests from "@/components/modules/Rides/PendingRequests";
import RideReqForm from "@/components/modules/Rides/RideReqForm";
import About from "@/pages/About";
import AdminHome from "@/pages/admin/AdminHome";
import RideManagement from "@/pages/admin/AdminRideManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import DriverManagement from "@/pages/admin/DriverManagement";
import RiderManagement from "@/pages/admin/RiderManagement";
import Contact from "@/pages/Contact";
import EditProfile from "@/pages/EditProfile";
import FAQ from "@/pages/FAQ";
import FeaturesPage from "@/pages/Features";
import Home from "@/pages/Home";
import BecomeDriverPage from "@/pages/rider/BecomeDriver";
import UserProfile from "@/pages/UserProfile";
import ViewAllUsersProfile from "@/pages/ViewAllUsersProfile";
import ViewSingleUserProfile from "@/pages/ViewSingleUserProfile";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/*",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "features",
        Component: FeaturesPage,
      },
      {
        path: "signup/*",
        Component: RegistrationForm,
      },
      {
        path: "login",
        Component: LoginForm,
      },
      {
        path: "become-driver",
        Component: BecomeDriverPage,
      },
      {
        path: "admin/",
        Component: AdminLayout,
        children: [
          {
            index: true,
            Component: AdminHome,
          },
          {
            path: "rides",
            Component: RideManagement,
          },
          {
            path: "drivers",
            Component: DriverManagement,
          },
          {
            path: "riders",
            Component: RiderManagement,
          },
          {
            path: "settings",
            Component: AdminSettings,
          },
        ],
      },
      {
        path: "user/profile/:id",
        Component: UserProfile,
      },
      {
        path: "user/edit-profile/:id",
        Component: EditProfile,
      },
      {
        path: "admin/all-users",
        Component: ViewAllUsersProfile,
      },
      {
        path: "admin/all-users/user/:id",
        Component: ViewSingleUserProfile,
      },
      {
        path: "ride/request",
        Component: RideReqForm,
      },
      {
        path: "ride/requests",
        Component: PendingRequests,
      },
    ],
  },
]);
