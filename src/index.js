import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import UserService from "./services/UserService";
import LazyLoader from "./components/LazyLoader";
import { StoreProvider } from "easy-peasy";
import store from "./store/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  const App = lazy(() => import("./App"));
  root.render(
    <StoreProvider store={store}>
      <React.StrictMode>
        <LazyLoader>
          <App />
        </LazyLoader>
      </React.StrictMode>
    </StoreProvider>
  );
};

UserService.initKeycloak(renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
