import React, { useState } from "react";
import "../../styles/Appointment.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";
import PropTypes from 'prop-types';

export default function Appointment(props) {
  const [errorMessage, setErrorMessage] = useState("ERROR_MESSAGE");
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR = "ERROR";
  const ERROR_MESSAGE = `Could not ${errorMessage} appointment`;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const showForm = () => {
    transition(CREATE);
  }

  function save(interviewDetails = null) {
    const interview = (interviewDetails) ? { student: interviewDetails.student, interviewer: interviewDetails.interviewer } : null;
    const action = (mode === DELETE) ? 'delete' : (mode === EDIT) ? 'edit' : 'create';
    const changeInSpots = (mode === DELETE) ? 1 : (mode === CREATE) ? -1 : 0;
    transition((action === 'delete') ? DELETING : SAVING, true);

    props.bookInterview(props.id, interview, changeInSpots)
      .then(() => {
        transition((interviewDetails) ? SHOW : EMPTY)
      })
      .catch(() => {
        setErrorMessage(action);
        transition(ERROR, true);
      })
  }

  function onDelete() {
    transition(DELETE);
  }

  function onEdit() {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => showForm()} />}
      {mode === SAVING && <Status text={'Saving'} />}
      {mode === DELETING && <Status text={'Deleting'} />}
      {mode === ERROR && <Error heading={'Error'} text={ERROR_MESSAGE} onClose={() => back()} />}
      {mode === DELETE && <Confirm text={'Are you sure you would like to delete?'} onConfirm={() => save()} onCancel={() => back()} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={onDelete}
          onEdit={onEdit}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
        />)}
    </article>
  );
}

Appointment.propTypes = {
  bookInterview: PropTypes.func,
  time: PropTypes.string,
  interviewers: PropTypes.array
};