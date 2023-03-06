import React from "react";
import "../styles/Button.scss";
import classNames from "classnames";
import PropTypes from 'prop-types';

// Different types of buttons: confirm, danger
export default function Button(props) {

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  confirm: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string
};