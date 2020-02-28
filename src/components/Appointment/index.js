import React, {Fragment} from 'react'
import "./styles.scss"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Header from "components/Appointment/Header"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"


import {useVisualMode} from "hooks/useVisualMode"

// the Appointment component that handles all the functionality of making an appoinment
export default function Appointment(props) {
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR = "ERROR";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"; 
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// calling our function that makes our state changes
const {mode, transition, back} = useVisualMode (

  props.interview ? SHOW : EMPTY, 
)


function save(name, interviewer) {
  const interview = {
    student: name, 
    interviewer
  }
  transition(SAVING)
  props
  .bookInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch(error => transition(ERROR_SAVE, true))
}

function appointmentDelete() {
  transition(DELETING)
  props
  .cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(error => transition(ERROR_DELETE, true))

}

  // where we send in our props to the smaller components and render all the information

  return (

    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && 
      (<Form 
      interviewers={props.interviewers} 
      onCancel={() => back()} 
      onSave={save} 
      />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving......"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting...."/>
      )}
      {mode === CONFIRM && (
        <Confirm 
        message={"Warning, this action is permanent - click cancel to go back"}
        onConfirm={appointmentDelete}
        onCancel={() => back()} />
      )}
      {mode === EDIT && (
        <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.name}
        />
      )}
      {mode === ERROR && (
        <Error 
        message={"Error"}
        onClose={() => back()}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error 
        message={"Error in Delete"}
        onClose={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error 
        message={"Error in Saving"}
        onClose={() => back()}
        />
      )}  
    

    </article>
  )

}
