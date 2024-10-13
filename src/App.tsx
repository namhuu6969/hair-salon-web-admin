import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./core/layout/AppLayout";
import UserManagement from "./pages/UserManagement";
import Login from "./core/layout/Login";
import Register from './core/layout/Register';
import Homepage  from './core/layout/Homepage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/homepage",
      element: <Homepage />, 
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register", 
      element: <Register />,
    },
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
