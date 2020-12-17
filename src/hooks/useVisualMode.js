import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    setHistory(current => (replace) ? ([...current.slice(0, -1), newMode]) : ([...current, newMode]) );
  };
  // if replace is true, slice the last item in history and place the newMode there
  // otherwise, simply 'push' the new mode to history

  const back = function() {
    history.length > 1 && history.pop();
    setMode(history.slice(-1)[0]);
  };
  // when we are not on last item in history, remove the current mode from history,
  // and then set mode to the mode that now exists in the last slot after the pop!

  return { mode, transition, back };
};