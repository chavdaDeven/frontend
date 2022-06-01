import { Questions } from "./RouteConsts";

function navigateToQuestionDetails(navigate, id) {
  navigate(`/${Questions}/${id}`);
}

const formateDate = (dateToFormate) => {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateToFormate));
  } catch (error) {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(new Date()));
  }
};

export { navigateToQuestionDetails, formateDate };
