export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

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
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      const tempState = { ...state, appointments: appointments};
      // create new state with the updated appointment
      // use that data to find the new value for spots

      const currentDay = tempState.days.find(day => day.appointments.includes(action.id));
      const spots = currentDay.appointments.filter(a => !tempState.appointments[a].interview);
      if (!action.interview) {
        spots.push(action.id);
      }
      // encountered a bit of an issue, so used the above 'push' as a work-around
      const days = tempState.days.map(day => {
        if (day.name === currentDay.name) {
          return { ...day, spots: spots.length };
        } else {
          return { ...day };
        }
      });
      return { ...tempState, days: days };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}