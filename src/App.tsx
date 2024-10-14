import { ReactNode, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import ErrorPage from "./pages/Error";
import LoginPage from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import Error403 from "./pages/Error/components/Error403";

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
          path: "user-management",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserManagement />
            </ProtectedRoute>
          ),
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
