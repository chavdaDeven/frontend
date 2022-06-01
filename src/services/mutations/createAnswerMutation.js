import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation createAnswerMutation($input: CreateAnswerInput!) {
    createAnswer(input: $input) {
      answer {
        id
        createdAt
        updatedAt
        text
      }
    }
  }
`;
