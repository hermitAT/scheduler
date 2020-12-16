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

    case SET_INTERVIEW: {
      const days = state.days.map(day => {
        if (action.interview && day.appointments.includes(action.id)) {
          day.spots--;
        } else if (!action.interview && day.appointments.includes(action.id)) {
          day.spots++;
        }
        return day;
      });

      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return { ...state, days: days, appointments: appointments};
      
      
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
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => dispatch({ type: SET_APPLICATION_DATA, all }))
    .catch(err => console.error(err));
  }, []);

  const bookInterview = function(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview});
      });
  };
  
  const cancelInterview = function(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null});
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
  
};