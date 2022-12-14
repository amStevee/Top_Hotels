import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import SearchContexProvider from "./context/searchContex";
import DarkModeContexProvider from "./context/Darkmodecontext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContexProvider>
      <SearchContexProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchContexProvider>
    </DarkModeContexProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
