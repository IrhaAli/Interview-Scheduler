import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import Appointment from "../components/Appointment";
import DayList from "../components/DayList";

export default function useApplicaiton() {
  // Day selected, days available and appointments made
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // Book, delete or edit interview
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

  // Go on the day clicked on
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
  }, []);

  // The days listed in the nav bar
  const dayList = <DayList days={state.days} value={state.day} onChange={setDay} />

  // Chosen day's schedule
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

  return { dayList, schedule }
}