export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const getSpots = function(state, id) {
  const day = state.days.find(d => d.appointments.includes(id));
  const newSpots = day.appointments.reduce((spots, num) => {
    return !state.appointments[num].interview ? spots + 1 : spots;
  }, 0);
  const newDay = { ...day, spots: newSpots };
  const days = state.days.map((d => d.name === newDay.name ? newDay : d));
  return days;
}

export default function reducer(state, action) {
  switch(action.type) {

    case SET_DAY:
      return { ...state, day: action.day };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.all[0].data,
        appointments: action.all[1].data,
        interviewers: action.all[2].data
      };
    // seperate the data from the 'all' returned from our useEffect into the correct state array/objects

    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      const tempState = { ...state, appointments: appointments };
      
      const days = getSpots(tempState, action.id);

      return { ...state, appointments: appointments, days: days };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};