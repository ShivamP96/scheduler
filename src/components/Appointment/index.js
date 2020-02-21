import React, {Fragment} from 'react'
import "./styles.scss"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Header from "components/Appointment/Header"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"

import {useVisualMode} from "hooks/useVisualMode"


export default function Appointment(props) {
console.log("Props: ",props)
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR = "ERROR";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

const {mode, transition, back} = useVisualMode (

  props.interview ? SHOW : EMPTY, 
)


function save(name, interviewer) {
  console.log("name and interviewer: ",name, interviewer)
  const interview = {
    student: name, 
    interviewer
  }
  transition(SAVING)
  props
  .bookInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch(error => transition(ERROR, true))
}

function appointmentDelete() {
  console.log("we are in delete")
  console.log(props)
  transition(DELETING)
  props
  .cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(error => transition(ERROR, true))

}



  return (

    <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving......"/>
      )}
      {mode === DELETING && (
        < Status message="Deleting...."/>
      )}
      {mode === CONFIRM && (
        <Confirm 
        message={"Warning, this action is permanent - click cancel to go back"}
        onConfirm={appointmentDelete}
        onCancel={() => back()} />
      )

      }
    

    </article>
  )

}
