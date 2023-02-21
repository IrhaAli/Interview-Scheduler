import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const spotsFull = (props.spots === 0);
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": spotsFull
  });

  let spotsAvailableText = (spotsFull) ? 'no' : props.spots;
  spotsAvailableText += (props.spots === 1) ? ' spot' : ' spots'
  spotsAvailableText += ' remaining';

  console.log(spotsAvailableText);

  return (
    <li onClick={() => props.setDay(props.name)} className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsAvailableText}</h3>
    </li>
  );
}