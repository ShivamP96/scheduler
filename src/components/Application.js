import React, {useState, useEffect} from "react";
import DayList from "components/DayList"
import "components/Appointment"
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"
import "components/Application.scss";
import Appointment from "components/Appointment";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(state => ({...state, day}))
  
  const lists = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
       />
    )
  })

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
