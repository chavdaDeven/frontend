import React from "react";
import graphql from "babel-plugin-relay/macro";
import { usePreloadedQuery } from "react-relay/hooks";

const DashboardMeQuery = graphql`
  query DashboardMeQuery {
    me {
      firstName
      lastName
    }
  }
`;

function Dashboard({ preloadedQuery }) {
  const data = usePreloadedQuery(DashboardMeQuery, preloadedQuery);
  return (
    <div>
      <p>Dashboard for {data.me.firstName}</p>
    </div>
  );
}

export default Dashboard;
