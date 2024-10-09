import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import UserManagement from "./pages/UserManagement";
import LoginPage from "./pages/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "admin",
      element: <AppLayout />,
      children: [
        {
          path: "user-management",
          element: <UserManagement />,
        },
      ],
    },
    {
      path: "",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
