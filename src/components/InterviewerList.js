import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const list = props.interviewers.map((i) => {
    return (
      <InterviewerListItem
        key={i.id}
        value={i.name}
        avatar={i.avatar}
        selected={props.value === i.id}
        setInterviewer={(event) => props.onChange(i.id)}
      />
    );
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {list}
      </ul>
    </section>
  );
};