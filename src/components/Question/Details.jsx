import graphql from "babel-plugin-relay/macro";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-relay";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import CHOICES from "../../CHOICES.js";
import createAnswerMutation from "../../services/mutations/createAnswerMutation";
import createCommentMutation from "../../services/mutations/createCommentMutation";
import updateQuestionMutation from "../../services/mutations/updateQuestionMutation";
import editIcon from "../../assets/icons/editIcon.svg";
import { formateDate } from "../../Utility/utils.js";
import { useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";

const getQuestionDetailsByIdQuery = graphql`
  query DetailsQuery($id: ID!) {
    question(id: $id) {
      id
      createdAt
      updatedAt
      text
      title
      answers {
        edges {
          node {
            id
            createdAt
            updatedAt
            text
            user {
              id
              firstName
              lastName
            }
            voteCount
            commentCount
          }
        }
      }
      voteUp
      voteDown
      voteCount
      commentCount
    }
  }
`;

const applyVoteMutation = graphql`
  mutation DetailsMutation($input: ApplyVoteInput!) {
    applyVote(input: $input) {
      vote {
        id
        createdAt
        updatedAt
        objectId
        kind
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const QuestionDetails = () => {
  let { questionID } = useParams();
  const [questionDetailsState, setQuestionDetailsState] = useState([]);
  const [showHideViewsState, setShowHideViewsState] = useState({
    showAddAnswerViewState: false,
    updateQuestionViewState: false,
    showAddCommentViewState: false,
  });

  const [mutateFunction, isLoading] = useMutation(applyVoteMutation);
  const [mutateUpdateQuestionFunction] = useMutation(updateQuestionMutation);
  const [mutateCreateCommentFunction] = useMutation(createCommentMutation);

  const [mutateAddAnswerFunction, isAnsLoading] =
    useMutation(createAnswerMutation);
  const data = useLazyLoadQuery(
    getQuestionDetailsByIdQuery,
    { id: questionID },
    { fetchPolicy: "store-or-network" }
  );

  const questionContentTypeID = useStoreState((store) =>
    store.getContentTypeIdByModel("questions", "question")
  );

  const commentContentTypeID = useStoreState((store) =>
    store.getContentTypeIdByModel("questions", "comment")
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerComment,
    handleSubmit: commentSubmit,
    formState: { commentErrors },
  } = useForm();

  const {
    register: registerUpdateQuestion,
    handleSubmit: updateQuestionSubmit,
    formState: { updateQuestionErrors },
  } = useForm();

  const updateQuestionDetails = useCallback(() => {
    setQuestionDetailsState(data.question);
  }, [data]);

  useEffect(() => {
    updateQuestionDetails();
  }, [updateQuestionDetails, data]);

  const upDownVoteClick = (isUpVote) => {
    if (isUpVote) {
      mutateFunction({
        variables: {
          input: {
            objectId: questionID,
            contentTypeId: questionContentTypeID,
            kind: CHOICES.VoteKind.CHOICE_LIST[0].value,
          },
        },
        onCompleted(res, error) {
          if (error) {
            if (
              error[0].message &&
              error[0].message != null &&
              error[0].message !== ""
            ) {
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
          // setQuestionDetailsState([
          //   ...questionDetailsState,
          //   { voteCount: questionDetailsState[0].voteCount + 1 },
          // ]);
        },
        onError(err) {
          console.error(err);
        },
      });
      return;
    }
    mutateFunction({
      variables: {
        input: {
          objectId: questionID,
          contentTypeId: questionContentTypeID,
          kind: CHOICES.VoteKind.CHOICE_LIST[1].value,
        },
      },
      onCompleted(res, error) {
        if (error) {
          if (
            error[0].message &&
            error[0].message != null &&
            error[0].message !== ""
          ) {
            console.error(error[0].message);
            return;
          }
          if (error.message && error.message != null && error.message !== "") {
            console.error(error.message);
            return;
          }
        }
        // setQuestionDetailsState([
        //   ...questionDetailsState,
        //   { voteCount: questionDetailsState[0].voteCount - 1 },
        // ]);
      },
      onError(err) {
        console.error(err);
      },
    });
  };

  const saveAnswerOnClickHandler = (data) => {
    if (data.answerInput && data.answerInput.length > 9) {
      mutateAddAnswerFunction({
        variables: {
          input: {
            questionId: questionID,
            text: data.answerInput,
          },
        },
        onCompleted(res, error) {
          if (error) {
            if (
              error[0].message &&
              error[0].message != null &&
              error[0].message !== ""
            ) {
              if (error[0].message.includes("duplicate key value")) {
                console.error(
                  "Same user can't add multiple answer, you need to update your old answer"
                );
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
          console.warn(res);
          setShowHideViewsState({
            ...showHideViewsState,
            showAddAnswerViewState: !showHideViewsState.showAddAnswerViewState,
          });
        },
        onError(err) {
          console.warn(err.message);
        },
      });
    }
  };

  const updateQuestionBtnOnClickHandler = (updatedQuestionData) => {
    if (
      (questionDetailsState?.title !==
        updatedQuestionData.updatedQuestionTitle ||
        questionDetailsState?.text !==
          updatedQuestionData.updatedQuestionBody) &&
      updatedQuestionData.updatedQuestionTitle &&
      updatedQuestionData.updatedQuestionBody
    ) {
      mutateUpdateQuestionFunction({
        variables: {
          input: {
            text: updatedQuestionData.updatedQuestionBody,
            title: updatedQuestionData.updatedQuestionTitle,
            id: questionID,
          },
        },
        onCompleted(res, error) {
          if (error) {
            if (
              error[0].message &&
              error[0].message != null &&
              error[0].message !== ""
            ) {
              console.error(error[0].message);
              return;
            }
            if (error.message && error.message != null) {
              console.error(error.message);
              return;
            }
          }
          console.warn(res);
          setShowHideViewsState({
            updateQuestionViewState: false,
          });
        },
        onError(err) {
          console.error(err);
        },
      });
    }
  };

  const addCommentBtnClickHandler = (data) => {
    if (showHideViewsState.showAddCommentViewState && data.commentInput) {
      // add comment button is visible can add comment in back-end
      mutateCreateCommentFunction({
        variables: {
          input: {
            objectId: questionID,
            contentTypeId: commentContentTypeID,
            text: data.commentInput,
          },
        },
        onError(err) {
          if (err) {
            console.error(err);
          }
          return;
        },
        onCompleted(res, err) {
          if (err) {
            console.error(err);
            return;
          }
          console.warn(res);
        },
      });
    }
    setShowHideViewsState({
      ...showHideViewsState,
      showAddCommentViewState: !showHideViewsState.showAddCommentViewState,
    });
  };

  return (
    <div className="row mt-3">
      {isLoading && <p>Loading Please wait for some time...</p>}
      {isAnsLoading && <p>Answer is getting added...</p>}
      <div className="col-2"></div>
      <div className="col-8">
        <div className="row">
          <div className="col-2">
            <div
              className="card mt-5 card-circle"
              onClick={() => upDownVoteClick(true)}
            >
              <div className="card-body">
                <p>UP</p>
              </div>
            </div>
            <div className="card mt-1 card-circle">
              <div className="card-body">
                <p>{questionDetailsState?.voteCount}</p>
              </div>
            </div>
            <div
              className="card mt-1 card-circle"
              onClick={() => upDownVoteClick(false)}
            >
              <div className="card-body">
                <p>DOWN</p>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="card mt-5">
              <div className="card-body">
                <div className="row">
                  <div className="col-11">
                    {!showHideViewsState.updateQuestionViewState ? (
                      <h5 className="card-title">
                        Question : {data.question?.title}
                      </h5>
                    ) : (
                      <form
                        onSubmit={updateQuestionSubmit(
                          updateQuestionBtnOnClickHandler
                        )}
                      >
                        <textarea
                          className="form-control"
                          placeholder="Update Your Question!"
                          defaultValue={data.question?.title}
                          {...registerUpdateQuestion("updatedQuestionTitle", {
                            required: true,
                            minLength: 10,
                          })}
                        />
                        {updateQuestionErrors &&
                          updateQuestionErrors.updatedQuestionTitle && (
                            <span style={{ color: "red" }}>
                              This field is required and minimum 10 characters
                            </span>
                          )}
                        <textarea
                          className="form-control"
                          defaultValue={questionDetailsState?.text}
                          placeholder="Update Your Question Body!"
                          {...registerUpdateQuestion("updatedQuestionBody", {
                            required: true,
                            minLength: 10,
                          })}
                        />
                        {updateQuestionErrors &&
                          updateQuestionErrors.updatedQuestionBody && (
                            <span style={{ color: "red" }}>
                              This field is required and minimum 10 characters
                            </span>
                          )}
                        <button
                          className="btn btn-outline-secondary mt-3"
                          type="submit"
                          id="updateQuestionBtn"
                        >
                          Update Question
                        </button>
                      </form>
                    )}
                  </div>
                  <div className="col-1 text-center">
                    {!showHideViewsState.updateQuestionViewState && (
                      <img
                        src={editIcon}
                        alt="Edit question"
                        style={{ height: "30px", width: "30px" }}
                        onClick={() =>
                          setShowHideViewsState({
                            updateQuestionViewState: true,
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                {!showHideViewsState.updateQuestionViewState && (
                  <>
                    <div className="row">
                      <div className="col">
                        <p>
                          Created At :
                          {` ${formateDate(questionDetailsState?.createdAt)}`}
                        </p>
                      </div>
                      <div className="col">
                        <p>
                          Updated At :
                          {` ${formateDate(questionDetailsState?.updatedAt)}`}
                        </p>
                      </div>
                    </div>

                    <p>Question Body: {questionDetailsState?.text}</p>
                    <form onSubmit={commentSubmit(addCommentBtnClickHandler)}>
                      {showHideViewsState.showAddCommentViewState && (
                        <>
                          <textarea
                            className="form-control"
                            placeholder="Write your comment here!"
                            {...registerComment("commentInput", {
                              required: true,
                              minLength: 10,
                            })}
                          />
                          {commentErrors && commentErrors.commentInput && (
                            <span style={{ color: "red" }}>
                              This field is required and minimum 10 characters
                            </span>
                          )}
                        </>
                      )}
                      <button
                        className="btn btn-outline-secondary mt-3 mb-3"
                        type="submit"
                        id="addCommentBtn"
                        // onClick={addCommentBtnClickHandler}
                      >
                        Add Comment
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
            {data.question.answers && data.question.answers.edges.length > 0 ? (
              <>
                <h5 className="mt-3 mb-3">Answers:</h5>
                {data.question.answers.edges.map((ele, i) => {
                  return (
                    <div className="card mt-1 card-circle" key={i}>
                      <div className="card-body">
                        <p>{ele.node.text}</p>
                        <div className="row">
                          <div className="col">
                            <p>
                              User :
                              {` ${ele.node.user.firstName} ${ele.node.user.lastName}`}
                            </p>
                          </div>
                          <div className="col">
                            <p>Created : {formateDate(ele.node.createdAt)}</p>
                          </div>
                          <div className="col">
                            <p>Updated : {formateDate(ele.node.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>Add Some Answers</p>
            )}
            {!showHideViewsState.showAddAnswerViewState ? (
              <button
                className="btn btn-outline-secondary mt-3"
                type="button"
                id="addAnswerBtn"
                onClick={() =>
                  setShowHideViewsState({
                    ...showHideViewsState,
                    showAddAnswerViewState:
                      !showHideViewsState.showAddAnswerViewState,
                  })
                }
              >
                Add Answer
              </button>
            ) : (
              <div className="mt-3">
                <form onSubmit={handleSubmit(saveAnswerOnClickHandler)}>
                  <textarea
                    {...register("answerInput", {
                      required: true,
                      minLength: 10,
                    })}
                    className="form-control"
                    placeholder="Write answer here!"
                  />
                  {errors.answerInput && (
                    <span style={{ color: "red" }}>
                      This field is required and minimum 10 characters
                    </span>
                  )}
                  <p>Minimum 10 characters should be there!</p>
                  <button
                    className="btn btn-outline-secondary mt-3"
                    type="submit"
                    id="saveAnswerBtn"
                    // onClick={saveAnswerOnClickHandler}
                  >
                    Save Answer
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default QuestionDetails;
