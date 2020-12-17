import React from "react";
import DayListItem from "components/DayListItem";

// map the data from the API to populate the information for each day within the DayListItem component created for each day
export default function DayList(props) {
  const list = props.days.map((day) => {
       return (
       <DayListItem
          key={day.id}
          value={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={(event) => props.setDay(day.name)}
        />
       );
  });
  return list; 
}