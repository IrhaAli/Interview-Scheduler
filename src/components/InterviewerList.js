import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((item) => (
          <InterviewerListItem
            id={item.id}
            name={item.name}
            avatar={item.avatar}
            selected={props.interviewer === item.id}
            setInterviewer={props.setInterviewer}
          />
        ))}
      </ul>
    </section>
  );
}