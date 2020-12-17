import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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