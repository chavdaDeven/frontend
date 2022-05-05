import "./App.scss";
import React, { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import LazyLoader from "./components/LazyLoader";
import RelayEnvironment from "./RelayEnvironment";
import RenderOnAnonymous from "./components/RenderOnAnonymous";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated";

const Navigation = lazy(() => import("./components/Navigation"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Questions = lazy(() => import("./components/Questions"));
const Settings = lazy(() => import("./components/Settings"));
const Profile = lazy(() => import("./components/Profile"));

function App() {
  return (
    <BrowserRouter>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <div className="container-fluid">
          <RenderOnAnonymous>
            <div className="App">NOT Authenticated yet!</div>
          </RenderOnAnonymous>
          <RenderOnAuthenticated>
            <Row>
              <Col>
                <LazyLoader>
                  <Navigation />
                </LazyLoader>
              </Col>
            </Row>
            <Row>
              <Col>
                <Routes>
                  {/*<Route index element={<Home />} />*/}
                  <Route
                    path="/dashboard"
                    element={
                      <LazyLoader>
                        <Dashboard />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path="/questions"
                    element={
                      <LazyLoader>
                        <Questions />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <LazyLoader>
                        <Settings />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <LazyLoader>
                        <Profile />
                      </LazyLoader>
                    }
                  />
                </Routes>
              </Col>
            </Row>
          </RenderOnAuthenticated>
        </div>
      </RelayEnvironmentProvider>
    </BrowserRouter>
  );
}

export default App;
