import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router-dom";
import { navigateToQuestionDetails } from "../../Utility/utils";
import getQuestionsQuery from "../../services/queries/getQuestionsQuery";

function Questions() {
  const navigate = useNavigate();

  const data = useLazyLoadQuery(getQuestionsQuery, {
    fetchPolicy: "network-only",
  });

  const onQuestionCardClick = (id) => {
    navigateToQuestionDetails(navigate, id);
  };
  return data.questions && data.questions.length === 0 ? (
    <p>Add Some Questions</p>
  ) : (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        {data.questions.map((ele, index) => {
          return (
            <div
              id={`card${index}`}
              key={ele.id}
              className="card mt-3"
              onClick={() => onQuestionCardClick(ele.id)}
            >
              <div className="card-body text-center">
                <h5 className="card-title">{ele.title}</h5>
                <p className="card-text">{ele.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col"></div>
    </div>
  );
}

export default Questions;
