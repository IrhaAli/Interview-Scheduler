import React from "react";
import "../styles/InterviewerListItem.scss";
import classNames from "classnames";
import PropTypes from 'prop-types';

export default function InterviewerListItem(props) {

  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li onClick={props.setInterviewer} className={interviewerListItemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

InterviewerListItem.propTypes = {
  selected: PropTypes.bool,
  setInterviewer: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string
};