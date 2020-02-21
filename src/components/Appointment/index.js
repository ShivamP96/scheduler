import React, {Fragment} from 'react'
import "./styles.scss"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Header from "components/Appointment/Header"
import {useVisualMode} from "hooks/useVisualMode"

export default function Appointment(props) {
console.log("Props: ",props)
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const {mode, transition, back} = useVisualMode (

  props.interview ? SHOW : EMPTY, 
)

  return (

    <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
    

    </article>
  )

}
  /* {props.interview ? 
<Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> 
: 
<Empty />} */
