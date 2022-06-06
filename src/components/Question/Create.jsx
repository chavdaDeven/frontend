import { useState } from "react";
import "../../styles/Question/Create.scss";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay/hooks";
import { useNavigate } from "react-router-dom";
import { navigateToQuestionDetails } from "../../Utility/utils";

const CreateQuestionMutation = graphql`
  mutation CreateMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        id
        text
        title
      }
    }
  }
`;

const CreateQuestion = () => {
  const [questionTitleState, setQuestionTitleState] = useState("");
  const [questionBodyState, setQuestionBodyState] = useState("");
  const [mutateFunction, isLoading] = useMutation(CreateQuestionMutation);
  const navigate = useNavigate();
  const [showErrorForTitle, setShowErrorForTitle] = useState(false);

  const askQuestionAndRedirectToDetails = () => {
    if (!showErrorForTitle) {
      mutateFunction({
        variables: {
          input: { title: questionTitleState, text: questionBodyState },
        },
        onCompleted(data, error) {
          if (error) {
            if (
              error[0].message &&
              error[0].message != null &&
              error[0].message !== ""
            ) {
              if (error[0].message.includes("duplicate key value violates")) {
                setShowErrorForTitle(true);
                return;
              }
              console.error(error[0].message);
              return;
            }
            if (
              error.message &&
              error.message != null &&
              error.message !== ""
            ) {
              console.error(error.message);
              return;
            }
          }
          setShowErrorForTitle(false);
          navigateToQuestionDetails(navigate, data.createQuestion.question.id);
        },
        onError(err) {
          console.error(err.message);
        },
      });
    }
  };

  return isLoading ? (
    <p className="text-center">Creating Question</p>
  ) : (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <div className="card mt-5">
          <div className="card-body text-center">
            <h5 className="card-title">Have any question?</h5>
            <h6 className="card-subtitle mb-2 text-muted">Ask Below!</h6>
            <input
              className="form-control"
              placeholder="Write your question here!"
              value={questionTitleState}
              onChange={($event) => {
                setShowErrorForTitle(false);
                setQuestionTitleState($event.target.value);
              }}
            />
            {showErrorForTitle && (
              <p className="error-message-txt mt-1">Title must be unique...</p>
            )}
            <textarea
              className="mt-3 form-control"
              value={questionBodyState}
              placeholder="Write more information related to your question here!"
              onChange={($event) => setQuestionBodyState($event.target.value)}
            />
            <button
              className="btn btn-outline-secondary mt-3"
              type="button"
              id="askQuestionBtn"
              onClick={askQuestionAndRedirectToDetails}
            >
              Ask Question
            </button>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default CreateQuestion;
