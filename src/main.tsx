import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./config/context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    <ToastContainer position="top-center" />
  </>
);