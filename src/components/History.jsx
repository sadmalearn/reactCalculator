import { useSelector, useDispatch } from 'react-redux';
import { calculatorActions } from '../redux/calculatorSlice';

const History = () => {
  const history = useSelector((state) => state.calculator.history);
  const dispatch = useDispatch();

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>History</h3>
        <button onClick={() => dispatch(calculatorActions.clearHistory())}>
          Clear
        </button>
      </div>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
