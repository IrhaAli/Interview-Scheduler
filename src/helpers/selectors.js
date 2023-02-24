export function getAppointmentsForDay(state, day) {
  for (const aDay of state.days) {
    if (aDay.name === day) {
      console.log(aDay)
      return aDay.appointments.map(appointment => state.appointments[appointment]);
    }
  }
  return [];
}