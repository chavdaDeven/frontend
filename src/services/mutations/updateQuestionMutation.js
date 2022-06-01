import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation updateQuestionMutation($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      question {
        title
        id
        createdAt
        updatedAt
        text
      }
    }
  }
`;
