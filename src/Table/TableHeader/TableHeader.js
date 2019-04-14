import React from 'react';
import classes from '../Table.module.scss';

const tableHeader = props => {
  let rowClasses = [classes.flexTable, classes.row];
  return (
    <div>
      <div className={rowClasses.join(' ')}>
        <div className={classes.flexRow}>{props.index + 1}</div>
        <div className={classes.flexRow}>{props.name}</div>
        <div className={classes.flexRow}>{props.age}</div>
        <div className={classes.flexRow}>{props.gender}</div>
        <div className={classes.flexRow}>{props.fruit}</div>
        <div className={classes.flexRow}>{props.color}</div>
      </div>
    </div>
  );
};

export default tableHeader;
