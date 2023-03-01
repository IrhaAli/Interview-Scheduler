import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import Appointment from "../components/Appointment";
import DayList from "../components/DayList";

export default function useApplicaiton() {

  // Day selected, days available and appointments made
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
      case SET_INTERVIEW:
        return { ...state, appointments: action.appointments, days: action.days };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 1,
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // Book, delete or edit interview
  function bookInterview(id, interview, changeInSpots, updateClient = false) {
    // Update the appointment and number of appointments being changed
    const appointment = {
      ...state.appointments[id],
      interview
    };

    if (updateClient) {

      console.log(state.appointments);
    }

    const days = [...state.days];
    days[state.day - 1].spots += changeInSpots;

    // Update all appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    if (updateClient) {
      console.log(appointments.id)
      return dispatch({ type: SET_INTERVIEW, appointments, days });
    }

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

  // Get request to fetch all days
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setApplicationData(all[0].data, all[1].data, all[2].data);
      // const websocket = new WebSocket('ws://localhost:8001');
      // websocket.onopen = () => {
      //   websocket.onmessage = (event) => bookInterview(event.data.id, event.data.interview, (event.data.interview) ? 1 : -1, true);
      // };
    })
  }, []);


  function setApplicationData(days, appointments, interviewers) {
    dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
  }

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