import { useState } from "react";

/*
 * Keep track of the component visited and transition from back and forth between them.
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Add the history to the front of the array so it's easier to remove and edit the histroy array
  function transition(value, replace = false) {
    (replace) ? setHistory(prev => [value, ...prev.slice(1)]) : setHistory(prev => [value, ...prev]);
    setMode(value);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        return [...prev.slice(1)]
      })
      setMode(history[1]);
    }
  }

  return { mode, transition, back };
}