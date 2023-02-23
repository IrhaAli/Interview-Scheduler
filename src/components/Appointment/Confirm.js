import React from "react";
import Button from '../Button'

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