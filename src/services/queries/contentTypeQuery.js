import graphql from "babel-plugin-relay/macro";

const contentTypeQuery = graphql`
  query contentTypeQuery {
    contentTypes {
      id
      appLabel
      model
    }
  }
`;

export default contentTypeQuery;
