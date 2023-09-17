import React from 'react';

const Button = ({ type, handleClick, children }) => {
  const isSubmit = ['signup', 'signin', 'update', 'forgot-password'].includes(
    type
  );
  return (
    <button
      className={`
        signin-form__control
        bg-green-400 
        p-2 block 
        w-full
        mb-2
      `}
      type={isSubmit ? 'submit' : 'button'}
      data-type={type}
      onClick={!isSubmit ? handleClick : null}
    >
      {children}
    </button>
  );
};

export default Button;
