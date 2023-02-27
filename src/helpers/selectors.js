export function getAppointmentsForDay(state, day) {
  for (const aDay of state.days) {
    if (aDay.name === day) {
      return [...aDay.appointments.map(appointment => state.appointments[appointment]), { id: "last", time: "5pm" }];
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
    if (aDay.name === day) {
      return aDay.interviewers.map((interviewer) => state.interviewers[`${interviewer}`])
    }
  }
  return [];
}