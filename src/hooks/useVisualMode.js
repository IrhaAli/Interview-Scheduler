import { useState } from "react";

/*
 * Keep track of the component visited and transition from back and forth between them.
 */
export default function useVisualMode(initial) {
  const [state, setState] = useState({
    mode: initial,
    history: [initial]
  });

  // Add the history to the front of the array so it's easier to remove and edit the histroy array
  function transition(mode, replace = false) {
    setState((prev) => {
      const history = (replace) ? [mode, ...prev.history.slice(1)] : [mode, ...prev.history];
      return { mode, history }
    })
  }

  function back() {
    setState((prev) => {
      const history = (state.history.length > 1) ? [...prev.history.slice(1)] : [...prev.history]
      const mode = state.history[1];
      return { mode, history }
    })
  }

  return { mode: state.mode, transition, back };
}