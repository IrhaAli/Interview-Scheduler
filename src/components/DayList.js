import React from "react";
import DayListItem from "./DayListItem";
import PropTypes from 'prop-types';

export default function DayList(props) {

  return (
    <ul>
      {props.days.map((day) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.id === props.value}
          setDay={() => props.onChange(day.id)}
        />
      ))}
    </ul>
  );
}

DayList.propTypes = {
  days: PropTypes.array,
  value: PropTypes.number,
  onChange: PropTypes.func
};