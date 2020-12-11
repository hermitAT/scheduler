import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    setHistory(current => (replace) ? ([...current.slice(0, -1), newMode]) : ([...current, newMode]) );
  };

  const back = function() {
    history.length > 1 && history.pop();
    setMode(history.slice(-1)[0]);
  };

  return { mode, transition, back };
};