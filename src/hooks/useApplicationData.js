import React, {useState, useEffect, useReducer} from "react";
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(state => ({...state, day}))

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
    .then((all) => {
      console.log(all[0].data);
      console.log(all[1].data);
      console.log(all[2].data);
      setState(state => ({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])



  function bookInterview(id, interview) {
    console.log(id,interview)
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return ( 
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => setState({...state, appointments}))
    )
}


function cancelInterview(id) {
  console.log(id)
  const appointment = {
    ...state.appointments[id],
    interview:null
  }

  const appointments = state.appointments;
 

  return ( 
    axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => setState({...state, appointments}))
  )
}

  return {
    state, setDay, bookInterview, cancelInterview
  }

}