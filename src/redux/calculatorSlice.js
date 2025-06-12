import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentValue: '',
  previousValue: '',
  operation: null,
  error: null,
  history: [],
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    enterDigit: (state, action) => {
      if (state.error) state.error = null;

      const digitOnlyLength = state.currentValue.replace(/[^0-9]/g, '').length;
      if (digitOnlyLength >= 12) {
        state.error = 'Cannot enter more than 12 digits';
        return;
      }

      if (action.payload === '0' && state.currentValue === '0') return;
      if (action.payload === '.' && state.currentValue.includes('.')) return;

      state.currentValue += action.payload;
    },

    chooseOperation: (state, action) => {
      if (state.error) state.error = null;
      if (state.currentValue === '' && state.previousValue === '') return;

      if (state.previousValue && state.currentValue !== '') {
        calculatorSlice.caseReducers.calculateResult(state);
      }

      state.operation = action.payload;
      state.previousValue = state.currentValue;
      state.currentValue = '';
    },

    calculateResult: (state) => {
      const prev = parseFloat(state.previousValue);
      const current = parseFloat(state.currentValue);
      if (isNaN(prev) || isNaN(current)) return;

      let result;
      const expression = `${state.previousValue} ${state.operation} ${state.currentValue}`;

      switch (state.operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          if (current === 0) {
            state.error = 'Cannot divide by 0';
            return;
          }
          result = prev / current;
          break;
        default:
          return;
      }

      const resultStr = parseFloat(result.toPrecision(5)).toString();
      state.currentValue = resultStr;
      state.operation = null;
      state.previousValue = '';
      state.history.unshift(`${expression} = ${resultStr}`);
    },

    clear: (state) => {
      state.currentValue = '';
      state.previousValue = '';
      state.operation = null;
      state.error = null;
    },

    deleteDigit: (state) => {
      if (state.error) state.error = null;
      state.currentValue = state.currentValue.slice(0, -1);
    },

    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const calculatorActions = calculatorSlice.actions;
export default calculatorSlice.reducer;
