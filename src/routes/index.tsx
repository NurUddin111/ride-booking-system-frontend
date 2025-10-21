import App from "@/App";
import LoginForm from "@/components/modules/Authentication/LoginForm";
import RegistrationForm from "@/components/modules/Authentication/RegistrationForm";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/*",
    Component: App,
    children: [
      {
        path: "api/v1/user/signup/*",
        element: <RegistrationForm />,
      },
      {
        path: "api/v1/auth/login",
        Component: LoginForm,
      },
    ],
  },
]);
