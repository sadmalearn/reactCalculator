import { useEffect } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { calculatorActions } from '../redux/calculatorSlice';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['C', '←']
];

const Keypad = () => {
  const dispatch = useDispatch();

  const handleClick = (value) => () => {
    processInput(value);
  };

  const processInput = (value) => {
    if (value === 'C') return dispatch(calculatorActions.clear());
    if (value === '←' || value === 'Backspace') return dispatch(calculatorActions.deleteDigit());
    if (value === '=' || value === 'Enter') return dispatch(calculatorActions.calculateResult());
    if ('+-*/'.includes(value)) return dispatch(calculatorActions.chooseOperation(value));
    if (/^\d$/.test(value) || value === '.') return dispatch(calculatorActions.enterDigit(value));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      processInput(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="keypad">
      {buttons.flat().map((label) => (
        <Button key={label} label={label} onClick={handleClick(label)} />
      ))}
    </div>
  );
};

export default Keypad;
