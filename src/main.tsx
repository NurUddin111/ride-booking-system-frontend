import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { router } from "./routes/index.tsx";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />,
      <Toaster richColors />
    </Provider>
  </StrictMode>
);
