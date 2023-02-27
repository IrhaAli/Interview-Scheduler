import React from "react";
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const showForm = () => {
    transition(CREATE);
  }

  function save(interviewDetails = null) {
    const interview = (interviewDetails) ? { student: interviewDetails.student, interviewer: interviewDetails.interviewer } : null;

    transition((interviewDetails) ? SAVING : DELETING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition((interviewDetails) ? SHOW : EMPTY)
      });
  }

  function onDelete() {
    transition(DELETE);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => showForm()} />}
      {mode === SAVING && <Status text={'Saving'} />}
      {mode === DELETING && <Status text={'Deleting'} />}
      {mode === DELETE && <Confirm text={'Are you sure you would like to delete?'} onConfirm={() => save()} onCancel={() => back()} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={onDelete}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
    </article>
  );
}
