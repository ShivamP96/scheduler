import React from 'react'
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"
import PropTypes from 'prop-types'

// the interviewerlist is the component that holds all the interviewers
export default function InterviewerList (props) {
  
  InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
  
  }
  
  const lists = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{lists}</ul>
    </section>
  )
}
