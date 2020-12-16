import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const listClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  function formatSpots(spots) {
    if (spots > 1) {
      return spots + " spots remaining";
    } else if (spots === 1) {
      return spots + " spot remaining";
    }
    return "no spots remaining";
  }

  return (
    <li className={listClass} onClick={props.setDay} data-testid="day" >
      <h2 className="text--regular">{props.value}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}