import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application() {
  // Day selected, days available and appointments made
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    // Update the appointment being changed
    const appointment = {
      ...state.appointments[id],
      interview
    };
    // Update all appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Update database
    const updateOrDelete = (interview) ? axios.put(`/api/appointments/${id}`, appointment) : axios.delete(`/api/appointments/${id}`)
    return updateOrDelete
      .then(() => {
        // Update state
        setState(prev => ({ ...prev, appointments }));
      })
  }


  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />);
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  // Get request to fetch all days
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}