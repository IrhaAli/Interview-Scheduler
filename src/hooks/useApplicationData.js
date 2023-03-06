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

  // Add an interview
  function addInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
  }

  // Edit an interview
  function editInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
  }

  // Delete an interview
  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
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
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    })
  }, []);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8001');
    websocket.onopen = () => {
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        dispatch({ type: SET_INTERVIEW, interview: data.interview, id: data.id });
      };
    };
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
        addInterview={addInterview}
        editInterview={editInterview}
        deleteInterview={deleteInterview}
      />);
  });

  return { dayList, schedule };
}