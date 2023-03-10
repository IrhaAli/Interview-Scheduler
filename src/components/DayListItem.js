import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";
import PropTypes from 'prop-types';

// A day from the nav bar
export default function DayListItem(props) {

  const spotsFull = (props.spots === 0);
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": spotsFull
  });

  let spotsAvailableText = (spotsFull) ? 'no' : props.spots;
  spotsAvailableText += (props.spots === 1) ? ' spot' : ' spots'
  spotsAvailableText += ' remaining';

  return (
    <li data-testid="day" onClick={props.setDay} className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsAvailableText}</h3>
    </li>
  );
}

DayListItem.propTypes = {
  spots: PropTypes.number,
  selected: PropTypes.bool,
  setDay: PropTypes.func,
  name: PropTypes.string
};