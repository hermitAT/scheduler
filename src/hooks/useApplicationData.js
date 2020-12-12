import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    update: true
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  useEffect(() => {
    const URL = `http://localhost:8001/api/`;
    Promise.all([
      axios.get(`${URL}days`),
      axios.get(`${URL}appointments`),
      axios.get(`${URL}interviewers`)
    ]).then(all => setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })))
    .catch(err => console.error(err));
  }, [state.update]);

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        state.update = !state.update;
        setState(prev => ({ ...prev, appointments: appointments }));
      });
  };
  
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        state.update = !state.update;
        setState(prev => ({ ...prev, appointments: appointments }));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
  
};