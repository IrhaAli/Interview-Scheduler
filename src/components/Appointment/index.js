import React, { useState, useEffect } from "react";
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
  // The different components appointment can have
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR = "ERROR";
  const ERROR_MESSAGE = `Could not ${errorMessage} appointment`;

  // Transitioning to different components
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Add an interview
  function onAdd(interviewDetails) {
    const interview = { student: interviewDetails.student, interviewer: interviewDetails.interviewer };
    transition(SAVING);

    props.addInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        setErrorMessage('create');
        transition(ERROR, true);
      })
  }

  // Edit an interview
  function onEdit(interviewDetails) {
    const interview = { student: interviewDetails.student, interviewer: interviewDetails.interviewer };
    transition(SAVING);

    props.editInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        setErrorMessage('edit');
        transition(ERROR, true);
      })
  }

  // Delete an interview
  function onDelete() {
    transition(DELETING);

    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        setErrorMessage('delete');
        transition(ERROR, true);
      })
  }

  // For realtime updates
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
  }, [props.interview, transition, mode]);

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        (<Empty
          onAdd={() => transition(CREATE)} />)}
      {mode === SAVING &&
        (<Status
          text={'Saving'} />)}
      {mode === DELETING &&
        (<Status
          text={'Deleting'} />)}
      {mode === ERROR &&
        (<Error
          heading={'Error'}
          text={ERROR_MESSAGE}
          onClose={() => back()} />)}
      {mode === DELETE &&
        (<Confirm text={'Are you sure you would like to delete?'}
          onConfirm={() => onDelete()}
          onCancel={() => back()} />)}
      {mode === SHOW && props.interview &&
        (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
        />)}
      {mode === CREATE &&
        (<Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={onAdd}
        />)}
      {mode === EDIT &&
        (<Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={onEdit}
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