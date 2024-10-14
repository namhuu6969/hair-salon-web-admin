import { useLocation } from "react-router-dom";
import Error403 from "./components/Error403";
import Error404 from "./components/Error404";

const ErrorPage = () => {
  const location = useLocation();
  if (location.pathname === "/forbidden") {
    return <Error403 />;
  }
  return <Error404 />;
};

export default ErrorPage;
