import { Outlet, Route, Routes, useLocation } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import RegistrationForm from "./components/modules/Authentication/RegistrationForm";

function App() {
  // const location = useLocation();
  // const state = location.state as { backgroundLocation?: Location };
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  return (
    <CommonLayout>
      <Outlet />

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="api/v1/user/signup/*"
            Component={RegistrationForm}
          />
        </Routes>
      )}
    </CommonLayout>
  );
}

export default App;
