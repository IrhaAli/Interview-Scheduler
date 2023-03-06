export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

// Set the state based on the item(s) in the state that needs to be changed
export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
    case SET_INTERVIEW:
      console.log('1', state.appointments);
      // Update the appointment and number of appointments being changed
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      };
      console.log('2', state.appointments);
      
      // Update spots remaining
      const days = [...state.days];
      console.log('3', state.appointments);

      const changeInSpots = (appointment.interview) ? (state.appointments[`${action.id}`].interview) ? 0 : -1 : +1;
      days[state.day - 1].spots += changeInSpots;

      console.log('4', state.appointments);

      // Update all appointments object
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      return { ...state, appointments, days };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}