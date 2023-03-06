import React from "react";
import Button from '../Button'
import PropTypes from 'prop-types';

// Confirm with user to delete the appointment
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.text}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel} children="Cancel" />
        <Button danger onClick={props.onConfirm} children="Confirm" />
      </section>
    </main>
  );
}

Confirm.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};