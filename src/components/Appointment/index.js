import React from "react";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
// import Error from "./Error";



export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "FORM";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  // const ERROR = "ERROR";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
    
  };

  const deleteInterview = function(id) {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"This action will remove the appointment from the system. Are you sure you want to proceed?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview()}
        />
      )}
      {mode === SAVING && (
        <Status message={"Saving..."} />
      )}
      {mode === DELETE && (
        <Status message={"Deleting..."} />
      )}
    </article>
  );
};