import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentValue,
  selectPreviousValue,
  selectOperation,
  selectError
} from '../redux/selectors';

const Display = () => {
  const current = useSelector(selectCurrentValue);
  const previous = useSelector(selectPreviousValue);
  const operation = useSelector(selectOperation);
  const error = useSelector(selectError);

  return (
    <div className="display">
      <div className="expression">
        {previous} {operation}
      </div>
      <output role="status" aria-live="polite" className="result">
        {error ? <span className="error-message">{error}</span> : current || '0'}
      </output>
    </div>
  );
};

export default Display;
