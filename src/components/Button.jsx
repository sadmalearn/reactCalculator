import React from 'react';

const Button = ({ label, onClick, variant = 'dark' }) => {
  const classMap = {
    gray: 'button-gray',
    orange: 'button-orange',
    dark: '',
  };

  return (
    <button
      className={`calculator-button ${classMap[variant]}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
