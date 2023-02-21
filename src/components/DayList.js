import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {DayListItem.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}