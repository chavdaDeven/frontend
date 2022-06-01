// createCommentMutation
import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation createCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
        id
        objectId
        text
        createdAt
        updatedAt
        contentType {
          id
          appLabel
          model
        }
        text
        user {
          id
          firstName
          lastName
        }
        voteUp
        voteDown
        voteCount
      }
    }
  }
`;
