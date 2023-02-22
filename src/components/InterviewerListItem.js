import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  const name = (props.selected) ? props.name : ''

  console.log(interviewerListItemClass);

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerListItemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={name}
      />
      {name}
    </li>
  )
}