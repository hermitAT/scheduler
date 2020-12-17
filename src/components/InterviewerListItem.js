import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  const listClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  // add the 'selected' class to the chosen interviewer

  return (
    <li className={listClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.value}
      />
      { props.selected && props.value}
    </li>
  );
};
