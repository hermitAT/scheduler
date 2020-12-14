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
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    case SET_INTERVIEW: {

      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      


      return { ...state, appointments: appointments };
    };

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
    const URL = `http://localhost:8001/api/`;
    Promise.all([
      axios.get(`${URL}days`),
      axios.get(`${URL}appointments`),
      axios.get(`${URL}interviewers`)
    ]).then(all => dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    .catch(err => console.error(err));
  }, [state.appointments]);

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