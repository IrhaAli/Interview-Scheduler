export default function getAppointmentsForDay(state, day) {
  for (const aDay of state.days) {
    if (aDay.name === day) {
      return aDay.appointments.map(appointment => state.appointments[appointment]);
    }
  }
  return [];
}