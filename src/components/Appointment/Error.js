import React from "react";
import PropTypes from 'prop-types';

export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">{props.heading}</h1>
        <h3 className="text--light">{props.text}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}

Error.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  onClose: PropTypes.func
};