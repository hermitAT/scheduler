export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  let forDay;
  let results = [];

  for (const d of days) {
    if (d.name === day) {
      forDay = d.appointments;
    }
  }

  if (!forDay) {
    return results;
  }

  for (const a in appointments) {
    if (forDay.includes(appointments[a].id)) {
      results.push(appointments[a]);
    }
  }
  return results;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~ getInterview ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

// ~~~~~~~~~~~~~~~~~~~~ getInterviewersForDay ~~~~~~~~~~~~~~~~~~~~~~~~~~

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  let forDay;
  let results = [];

  for (const d of days) {
    if (d.name === day) {
      forDay = d.interviewers;
    }
  }

  if (!forDay) {
    return results;
  }

  for (const i in interviewers) {
    if (forDay.includes(interviewers[i].id)) {
      results.push(interviewers[i]);
    }
  }
  return results;
};
