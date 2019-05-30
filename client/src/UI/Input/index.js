import React from 'react';

const Input = ({ input, label, meta }) => {
  const { touched, error } = meta;
  const withError = touched && error;
  const fieldClassName = `field ${withError ? 'error' : ''}`;
  const renderError = withError
    ? (
      <div className="ui error message">
        {error}
      </div>
    )
    : null;

  return (
    <div className={fieldClassName}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {renderError}
    </div>
  )
};

export default Input;
