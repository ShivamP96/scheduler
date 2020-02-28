import { useState } from "react";

// the usevisualmode function is a funciton that usese the state and is able to store the state as a stack of transitions
export function useVisualMode (initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    if (replace) {
      let newArray = history.slice(0,(history.length-1))
      setHistory( value => [...newArray, mode])
    }else{
      setHistory( next => [...history, mode])
    }
    setMode(mode)
    
  }

  function back() {
    if (history.length > 1) {

      const newHistory = history.slice(0, history.length-1)
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])

    } else {
      setMode(initial)
    }
  }


  return {
  mode: history[history.length -1],
  transition,
  back 
  };
}