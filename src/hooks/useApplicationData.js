import React, {useState, useEffect, useReducer} from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


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