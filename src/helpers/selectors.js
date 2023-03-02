export function getAppointmentsForDay(state, day) {
  for (const aDay of state.days) {
    if (aDay.id === day) {
      // Determine the last hour while ensuring that am/pm is consistent and hour does not exceed 12
      const switchAmPm = { am: 'pm', pm: 'am' }
      const lastAppointment = state.appointments[aDay.appointments.slice(-1)].time;
      const lastAppointmentTime = lastAppointment.slice(0, lastAppointment.length - 2)
      const amPm = lastAppointment.slice(-2);
      let lastHour = (Number(lastAppointmentTime) + 1) % 12;
      lastHour += (lastHour < lastAppointmentTime) ? switchAmPm[`${amPm}`] : amPm;

      return [...aDay.appointments.map(appointment => state.appointments[appointment]), { id: "last", time: lastHour }];
    }
  }
  return [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  for (const interviewer of Object.values(state.interviewers)) {
    if (interviewer.id === interview.interviewer) {
      return { ...interview, interviewer };
    }
  }
}

export function getInterviewersForDay(state, day) {
  for (const aDay of state.days) {
    if (aDay.id === day) {
      return aDay.interviewers.map((interviewer) => state.interviewers[`${interviewer}`])
    }
  }
  return [];
}