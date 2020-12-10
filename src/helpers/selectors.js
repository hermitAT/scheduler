export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  let currentDay;
  let results = [];

  for (const d of days) {
    if (d.name === day) {
      currentDay = d.appointments;
    }
  }

  if (!currentDay) {
    return results;
  }

  for (const a in appointments) {
    if (currentDay.includes(appointments[a].id)) {
      results.push(appointments[a]);
    }
  }
  return results;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const { interviewers } = state;
  const { student, interviewer } = interview;


  const resultInterview = {
    "student": student,
    "interviewer": null
  };

  for (const i in interviewers) {
    if (interviewers[i].id === interviewer) {
      resultInterview.interviewer = interviewers[i];
    }
  }
  return resultInterview;
};