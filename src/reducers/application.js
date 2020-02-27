import React, {useState, useEffect, useReducer} from "react";


export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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
