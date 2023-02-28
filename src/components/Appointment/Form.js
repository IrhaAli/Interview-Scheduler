import React, { useState } from 'react';
import Button from '../Button'
import InterviewerList from '../InterviewerList'
import PropTypes from 'prop-types';

export default function Form(props) {


  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setStudent("");
  };

  const cancel = () => {
    reset();
    props.onCancel()
  }

  const save = () => {
    // Validate input
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    // Save if valid input
    const interviewDetails = { student, interviewer };
    props.onSave(interviewDetails);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} children="Cancel" />
          <Button confirm onClick={save} children="Save" />
        </section>
      </section>
    </main>
  );
}

Form.propTypes = {
  student: PropTypes.string,
  interviewers: PropTypes.array,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};