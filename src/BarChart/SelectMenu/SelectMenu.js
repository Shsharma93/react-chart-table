import React from 'react';
import classes from './SelectMenu.module.scss';

const selectMenu = props => {
  const color = props.labels.map((el, i) => {
    return (
      <option key={i} value={el}>
        {el}
      </option>
    );
  });
  return (
    <div className={classes.groupMenu}>
      <span>{props.category} : </span>
      <select
        style={{ overflowY: 'auto', maxHeight: '50px' }}
        onChange={props.changed}
        disabled={props.filter}
      >
        <option value='select'>select</option>
        {color}
      </select>
    </div>
  );
};

export default selectMenu;
