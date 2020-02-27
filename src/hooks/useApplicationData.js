import React, {useState, useEffect, useReducer} from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  // console.log("action ",action)
  // console.log("state ",state)
  switch(action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day

      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days:action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      const appointments = {
        ...state.appointments,
        [action.id]: action.appointment
      }
  
      const tempDays = JSON.parse(JSON.stringify(state.days))
      // console.log("tempDays ",tempDays)
      for(let day in tempDays) {
        if (tempDays[day].appointments.includes(action.id)) {
          const dayAppts = tempDays[day].appointments;
          tempDays[day].spots = dayAppts.length - dayAppts.filter((id) => appointments[id].interview).length;
          break
        }
      }

      return {
        ...state, 
        appointments,
        days: tempDays
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );  
  }
}

export default function useApplicationData(props) {


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day});



  useEffect(() => {
    if (state.days.length === 0) {
      Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
    .then((all) => {
      // console.log("all[2]  ",all[2].data)
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    })
  }
},
[])
  
  function bookInterview(id, interview) {
    // console.log(id,interview)
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    return ( 
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({type: SET_INTERVIEW, appointment, id})
      })
    )
}


function cancelInterview(id) {
  // console.log(id)
  const appointment = {
    ...state.appointments[id],
    interview: null
  }
   

  return ( 
    axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, appointment, id})
    })
  )
}


  return {
    state, setDay, bookInterview, cancelInterview
  }

}