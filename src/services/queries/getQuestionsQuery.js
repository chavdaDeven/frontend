import graphql from "babel-plugin-relay/macro";

export default graphql`
  query getQuestionsQuery {
    questions {
      id
      createdAt
      updatedAt
      text
      title
      voteUp
      voteDown
      voteCount
      commentCount
    }
  }
`;
