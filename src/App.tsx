import { ReactNode, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import ErrorPage from "./pages/Error";
import Error403 from "./pages/Error/components/Error403";
import LoginPage from "./pages/Login";
import Management from "./pages/Management";
import UserManagement from "./pages/Management/UserManagement";
import ServiceMangement from "./pages/Management/ServiceManagement";
import ServiceManagementTable from "./pages/Management/ServiceManagement/Service";
import ComboManagement from "./pages/Management/ServiceManagement/Combo";
import StylistManagement from "./pages/Management/StylistManagement";

const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: ReactNode;
}) => {
  return isAuthenticated ? children : <Navigate to="/forbidden" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = createBrowserRouter([
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "admin",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <Management />,
          children: [
            {
              path: "user-management",
              element: <UserManagement />,
            },
            {
              path: "service-management",
              element: <ServiceMangement />,
              children: [
                { path: "", element: <ServiceManagementTable /> },
                { path: "combo", element: <ComboManagement /> },
              ],
            },
            {
              path: "stylist-management",
              element: <StylistManagement />,
            },
          ],
        },
      ],
    },
    {
      path: "/forbidden",
      element: <Error403 />,
    },
    {
      path: "",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
