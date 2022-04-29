import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

import React, { Suspense, lazy } from "react";
import RenderOnAnonymous from "./components/RenderOnAnonymous";
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
          <Navigation />
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  );
}

export default App;
