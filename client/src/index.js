import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import SectionProvider from "./components/SectionContext";
import TestProvider from "./components/TestContext";
import UserProvider from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TestProvider>
        <SectionProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SectionProvider>
      </TestProvider>
    </UserProvider>
  </React.StrictMode>
);
