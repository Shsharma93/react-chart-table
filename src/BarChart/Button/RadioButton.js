import React from 'react';

const radioButton = props => (
  <div style={{ display: 'inline', marginRight: '40px' }}>
    <input
      onChange={props.click}
      type='radio'
      value='Fruit'
      checked={props.checked}
      style={{ marginRight: '20px' }}
    />
    {props.type}
  </div>
);

export default radioButton;
