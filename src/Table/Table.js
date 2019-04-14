import React from 'react';
import classes from './Table.module.scss';
import TableHeader from './TableHeader/TableHeader';

const table = props => {
  let headerClasses = [classes.flexTable, classes.header];

  let tableRows = props.data.map((element, i) => {
    return (
      <TableHeader
        key={i}
        index={i}
        name={element.name}
        age={element.age}
        gender={element.gender}
        fruit={element.favoriteFruit}
        color={element.favoriteColor}
      />
    );
  });

  return (
    <div className={classes.tableContainer}>
      <div className={headerClasses.join(' ')}>
        <div className={classes.flexRow}>S.No</div>
        <div className={classes.flexRow}>Name</div>
        <div className={classes.flexRow}>Age</div>
        <div className={classes.flexRow}>Gender</div>
        <div className={classes.flexRow}>Fruits</div>
        <div className={classes.flexRow}>Color</div>
      </div>
      <div className={classes.tableRowContainer}>{tableRows}</div>
    </div>
  );
};

export default table;
