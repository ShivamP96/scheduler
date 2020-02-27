import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from "components/Button"

export default function Form (props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("")
    props.onSave(name, interviewer);
  }


  function reset () {
    setName("")
    setInterviewer(null)
    props.onCancel()
  }

  function cancel() {
    reset()
  }

 
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}> 
      <input
        value={name}
        onChange={(event) =>  setName(event.target.value)}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
       data-testid="student-name-input"
      />
  <section className="appointment_validation"> {error} </section>
  <InterviewerList 
    interviewers={props.interviewers}
    interviewer={interviewer} 
    setInterviewer={setInterviewer} />
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={() => validate()} confirm>Save</Button>
    </section>
  </section>


    </form>
    </section>
  
</main>
  )


}


