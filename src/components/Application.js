import React, {useState, useEffect} from "react";
import DayList from "components/DayList"
import "components/Appointment"
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"
import "components/Application.scss";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  // taking all the values from the useApplicationData and setting it by object deconstruction
  const {
    state, 
    setDay, 
    bookInterview, 
    cancelInterview
  } = useApplicationData();

  // setting interviewer state
  const interviewers = getInterviewersForDay(state, state.day);
  
  // lists is the name of all the appointments
  const lists = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);

    // returning the appointment component with the following props
    return (
      <Appointment 
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
       />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
        
      </section>
      <section className="schedule">
        {lists}
        <Appointment key="last" time="5pm" /> 
       </section>
    </main>
  );
}
