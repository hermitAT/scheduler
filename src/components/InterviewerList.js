import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"

// pass the data from state.interviewers to be used within each interviewer list used within the form
function InterviewerList(props) {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;