const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1,2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
  
};



export function getAppointmentsForDay(state, day) {
  let selectedArray = []
  const filteredDaysName = state.days.filter(key => key.name === day)
  if (filteredDaysName.length === 0) {
    return []
  }
  let arrayAppointment = filteredDaysName[0].appointments;
  for (let element of arrayAppointment) {
    selectedArray.push(state.appointments[element])
  }
  return (selectedArray);
}


export function getInterview(state, interview) {
  if(!interview) {
    return null
  }
  return {
    ...interview, interviewer: state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state, day) {

  let selectedArray = []

  const filteredDaysName = state.days.filter(key => key.name === day)


  if (filteredDaysName.length === 0) {
    return []
  }

  let arrayAppointment = filteredDaysName[0].appointments;
  console.log(arrayAppointment)
  for (let element of arrayAppointment) {
    selectedArray.push(state.interviewers[element])
  }
  // console.log(selectedArray)
  return (selectedArray);



}
