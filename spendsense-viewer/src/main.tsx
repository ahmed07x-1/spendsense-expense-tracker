import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      }}
    />
  </StrictMode>
);