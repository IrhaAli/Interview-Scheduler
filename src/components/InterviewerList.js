import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "../styles/InterviewerList.scss";
import PropTypes from 'prop-types';

// All interviewers for the day
export default function InterviewerList(props) {
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={props.value === interviewer.id}
            setInterviewer={() => props.onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func

};
