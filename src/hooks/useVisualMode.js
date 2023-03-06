import { useState } from "react";

/*
 * Keep track of the component visited and transition back and forth between them.
 */
export default function useVisualMode(initial) {
  // Setting initial state
  const [state, setState] = useState({
    mode: initial,
    history: [initial]
  });

  // Move to another mode in appointment component
  function transition(mode, replace = false) {
    setState((prev) => {
      // Add the history to the front of the array so it's easier to remove and edit the histroy array
      const history = (replace) ? [mode, ...prev.history.slice(1)] : [mode, ...prev.history];
      return { mode, history }
    })
  }

  // Switch back to the mode previously on the appointment component
  function back() {
    setState((prev) => {
      const history = (state.history.length > 1) ? [...prev.history.slice(1)] : [...prev.history]
      const mode = state.history[1];
      return { mode, history }
    })
  }

  return { mode: state.mode, transition, back };
}