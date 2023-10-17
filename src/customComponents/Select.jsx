import React from 'react';

const Option = ({ value, children }) => {
  return <li></li>;
};

const Select = ({ name, value, children }) => {
  return (
    <div className='select'>
      <input type='hidden' name={name} value={value} />
      <button className='select__toggler'></button>

      <ul className='select__options'>${children}</ul>
    </div>
  );
};

export default Select;
