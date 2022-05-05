import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

import React, { lazy } from "react";
import RenderOnAnonymous from "./components/RenderOnAnonymous";
import LazyLoader from "./components/LazyLoader";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated";

const Navigation = lazy(() => import("./components/Navigation"));

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <RenderOnAnonymous>
          <div className="App">NOT Authenticated yet!</div>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <LazyLoader>
            <Navigation />
          </LazyLoader>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  );
}

export default App;
