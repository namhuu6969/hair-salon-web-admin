import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./config/context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { store } from "./core/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
    <ToastContainer position="top-center" />
  </>
);
