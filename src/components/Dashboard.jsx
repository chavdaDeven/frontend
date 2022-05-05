import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { loadQuery, usePreloadedQuery } from "react-relay/hooks";

import RelayEnvironment from "../RelayEnvironment";

const DashboardMeQuery = graphql`
  query DashboardMeQuery {
    me {
      firstName
      lastName
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, DashboardMeQuery);

function Dashboard() {
  const data = usePreloadedQuery(DashboardMeQuery, preloadedQuery);
  return (
    <div>
      <p>Dashboard for {data.me.firstName}</p>
    </div>
  );
}

export default Dashboard;
