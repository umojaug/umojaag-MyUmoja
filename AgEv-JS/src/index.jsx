import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./hooks/context";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="bg-primary">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </div>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
