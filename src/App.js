import "./App.scss";
import React, { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import { loadQuery } from "react-relay/hooks";
import LazyLoader from "./components/LazyLoader";
import RelayEnvironment from "./RelayEnvironment";
import RenderOnAnonymous from "./components/RenderOnAnonymous";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated";
import { Questions as QuestionsRoute, Create } from "./Utility/RouteConsts.js";
import CreateQuestion from "./components/Question/Create";
import QuestionDetails from "./components/Question/Details";
import Home from "./components/Home";

const Navigation = lazy(() => import("./components/Navigation"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Questions = lazy(() => import("./components/Question/Index"));
const Settings = lazy(() => import("./components/Settings"));
const Profile = lazy(() => import("./components/Profile"));

const DashboardMeQuery = require("./components/__generated__/DashboardMeQuery.graphql.js");
const dashboardMeQuery = loadQuery(RelayEnvironment, DashboardMeQuery);

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
                  <Route
                    index
                    element={
                      <LazyLoader>
                        <Home />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <LazyLoader>
                        <Dashboard preloadedQuery={dashboardMeQuery} />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path={`/${QuestionsRoute}`}
                    element={
                      <LazyLoader>
                        <Questions />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path={`/${QuestionsRoute}/${Create}`}
                    element={
                      <LazyLoader>
                        <CreateQuestion />
                      </LazyLoader>
                    }
                  />
                  <Route
                    path={`/${QuestionsRoute}/:questionID`}
                    element={
                      <LazyLoader>
                        <QuestionDetails />
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
