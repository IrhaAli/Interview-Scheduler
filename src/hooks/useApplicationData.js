import React, { useReducer, useEffect } from "react";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/application";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import Appointment from "../components/Appointment";
import DayList from "../components/DayList";

export default function useApplicaiton() {


  // Setting initial state
  const [state, dispatch] = useReducer(reducer, {
    day: 1,
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // Book, delete or edit interview
  function bookInterview(id, interview, changeInSpots) {
    // Update the appointment and number of appointments being changed
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const days = [...state.days];
    days[state.day - 1].spots += changeInSpots;

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
        dispatch({ type: SET_INTERVIEW, appointments, days });
      })
  }

  // Go on the day clicked on
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // Get all data when app is visited
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
  }, []);

  // Stretch to be finished
  // useEffect(() => {
  //   const websocket = new WebSocket('ws://localhost:8001');
  //   websocket.onopen = () => {
  //     websocket.onmessage = (event) => console.log(event.data, state);
  //   };
  //   // bookInterview(event.data.id, event.data.interview, (event.data.interview) ? 1 : -1, true)
  // }, []);

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

  return { dayList, schedule };
}