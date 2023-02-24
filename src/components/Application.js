import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js";

export default function Application(props) {
  // Day selected, days available and appointments made
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }
  const setDay = (day) => {
    setState(prev => ({ ...prev, day }));
  }


  // Get request to fetch all days
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then((all) => {
      
      console.log(all);
    })
  }, [])


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
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
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
        {dailyAppointments.map((appointment) =>
          <Appointment
            key={appointment.id}
            {...appointment}
          />)}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}