
// this is where all the helper functions are stored that assist in the index, and appointment and applicaiton files
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
  // console.log("state for get interview: ", state)

  let selectedArray = []

  const filteredDaysName = state.days.filter(key => key.name === day)


  if (filteredDaysName.length === 0) {
    return []
  }

  let arrayAppointment = filteredDaysName[0].interviewers;
  // console.log(arrayAppointment)
  for (let appointmentID of arrayAppointment) {
    // if (state.appointments[appointmentID].interview) {
    // let interviewerID = state.appointments[appointmentID].interview.interviewer
    selectedArray.push(state.interviewers[appointmentID])
    
    
  }
  // console.log("select3ed array: ",selectedArray)
  return (selectedArray);



}
