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
      // using a bit of a workaround in order to update the counter, using a special value within state that is changed on every SET_INTERVIEW dispatch
      // this property of state is the condition related to our useEffect, so we are able to refresh all the API data
      // after every change to the appointments. This feels efficient although I am still looking into how that pressure could affect the server..
      const update = { ...state.update++ };
      return { ...state, appointments: appointments, update: update};
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}