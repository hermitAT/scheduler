import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
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

const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = (day) => { dispatch({ type: SET_DAY, day }) };
  // keep setDay and the fn name, but use a dispatch to set the day
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => dispatch({ type: SET_APPLICATION_DATA, all }))
    .catch(err => console.error(err));
  }, []);
  // retrieve all the data from API, use the reducer to apply logic

  const bookInterview = function(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview});
      });
  };
  // send a PUT req to the server, editing the existing appointment.id.
  // This must be a PUT because the ID will always exist and we are simply editing the interview object within it
  
  const cancelInterview = function(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null});
      });
  };
  // delete request sent to DB, and reducer will handle updating the state with the new null interview

  return { state, setDay, bookInterview, cancelInterview };
  
};