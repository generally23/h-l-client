import React from 'react';

const Button = ({ type, handleClick, children, classNames = '' }) => {
  const isRegularButton = ['prev', 'next'].includes(type);

  return (
    <button
      className={`
        signin-form__control
        bg-green-400 
        p-2 
        block 
        w-full
        rounded-sm
        ${classNames}
      `}
      type={isRegularButton ? 'button' : 'submit'}
      data-type={type}
      onClick={isRegularButton ? handleClick : null}
    >
      {children}
    </button>
  );
};

export default Button;
