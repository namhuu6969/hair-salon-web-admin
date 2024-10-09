import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import UserManagement from "./pages/UserManagement";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "admin",
      element: <AppLayout />,
      children: [
        {
          path: 'user-management',
          element: <UserManagement />
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
