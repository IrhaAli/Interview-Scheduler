import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [value, onChange] = useState("Monday");

  return (
    <main className="layout">

      {/* Sidebar */}
      <section className="sidebar">

        {/* Interview Scheduler Image */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        {/* List of Days */}
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={value}
            onChange={onChange}
          />
        </nav>

        {/* LHL Image */}
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      </section>
    </main>
  );
}
