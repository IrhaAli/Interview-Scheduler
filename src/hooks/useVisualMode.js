import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(value, replace = false) {
    if (!replace) {
      setHistory(prev => [value, ...prev])
    } else {
      setHistory(prev => [value, ...prev.slice(1)])
    }
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