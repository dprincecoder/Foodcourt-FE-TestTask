import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FileProvider } from "./context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </React.StrictMode>
);
