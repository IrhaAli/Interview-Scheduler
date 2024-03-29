import React from "react";
import "../styles/Application.scss";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  // Get all relevant info and functions from userApplication hook
  const { schedule, dayList } = useApplicationData();

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
          {dayList}
        </nav>

        {/* LHL Image */}
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      {/* Appointments */}
      <section className="schedule">
        {schedule}
      </section>

    </main>
  );
}