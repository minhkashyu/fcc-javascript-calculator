import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface CalculatorState {
  lastValue: string
  displayValue: string
  displayFormula: string
  arrayFormula: string[]
  calculation: number
  previousCalculation: number
}

export const initialState: CalculatorState = {
  lastValue: "",
  displayValue: "0",
  displayFormula: "",
  arrayFormula: [],
  calculation: 0,
  previousCalculation: 0,
}

export interface FormulaValueState {
  value: string
}

export const formulaValues = {
  clear: "AC",
  divide: "/",
  multiply: "*",
  subtract: "-",
  add: "+",
  decimal: ".",
  equal: "=",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

const isOperator = (value: string) => {
  return (
    value === formulaValues.add ||
    value === formulaValues.subtract ||
    value === formulaValues.multiply ||
    value === formulaValues.divide
  )
}

const isNumber = (value: string) => {
  return !isNaN(Number(value))
}

const updateLastValue = (state: CalculatorState, value: string) => {
  if (state.arrayFormula.length > 0) {
    state.arrayFormula[state.arrayFormula.length - 1] = value
  } else {
    state.arrayFormula.push(value)
  }

  return state
}

const safeEval = (formula: string) => {
  // strip anything other than digits, (), -+/* and .
  let str = formula.replace(/[^-()\d/*+.]/g, "")
  // eslint-disable-next-line no-eval
  let result = eval(str)
  // User Story #15: My calculator should have several decimal places of precision when it comes
  // to rounding (note that there is no exact standard, but you should be able to handle
  // calculations like 2 / 7 with reasonable precision to at least 4 decimal places).
  return Math.round(result * 1000000) / 1000000
}

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addFormula: (state, action: PayloadAction<FormulaValueState>) => {
      let shouldUpdateLastValue = true

      switch (action.payload.value) {
        case formulaValues.clear:
          // User Story #7: At any time, pressing the clear button clears the input and output values,
          // and returns the calculator to its initialized state;
          // 0 should be shown in the element with the id of display.
          state.arrayFormula = []
          state.displayValue = "0"
          state.calculation = 0
          state.previousCalculation = 0
          break
        case formulaValues.zero:
        case formulaValues.one:
        case formulaValues.two:
        case formulaValues.three:
        case formulaValues.four:
        case formulaValues.five:
        case formulaValues.six:
        case formulaValues.seven:
        case formulaValues.eight:
        case formulaValues.nine:
          if (state.lastValue === formulaValues.equal) {
            state.arrayFormula = [action.payload.value]
            state.displayValue = action.payload.value
            state.calculation = 0
            state.previousCalculation = 0
            break
          }

          // User Story #11: When the decimal element is clicked, a . should append to
          // the currently displayed value; two . in one number should not be accepted.
          if (state.displayValue.includes(".")) {
            state.displayValue += action.payload.value
            state = updateLastValue(state, state.displayValue)
            break
          }

          // User Story #8: As I input numbers, I should be able to see my input in the element
          // with the id of display.
          if (isNumber(state.lastValue)) {
            if (state.displayValue === "0") {
              // User Story #10: When inputting numbers, my calculator should not allow a number
              // to begin with multiple zeros.
              state.displayValue = action.payload.value
            } else {
              state.displayValue += action.payload.value
            }

            state = updateLastValue(state, state.displayValue)
          } else {
            state.displayValue = action.payload.value
            state.arrayFormula.push(state.displayValue)
          }
          break
        case formulaValues.decimal:
          // User Story #11: When the decimal element is clicked, a . should append to
          // the currently displayed value; two . in one number should not be accepted.
          if (state.displayValue.includes(".")) {
            shouldUpdateLastValue = false
            break
          }

          if (isNumber(state.displayValue)) {
            state.displayValue += action.payload.value
            state = updateLastValue(state, state.displayValue)
          } else {
            state.displayValue = "0."
          }
          break
        case formulaValues.add:
        case formulaValues.divide:
        case formulaValues.multiply:
        case formulaValues.subtract:
          // User Story #14: Pressing an operator immediately following = should start
          // a new calculation that operates on the result of the previous evaluation.
          if (state.lastValue === formulaValues.equal) {
            state.displayValue = action.payload.value
            state.previousCalculation = state.calculation
            state.calculation = 0
            state.arrayFormula = [
              state.previousCalculation + "",
              action.payload.value,
            ]
            break
          }

          // User Story #13: If 2 or more operators are entered consecutively, the operation
          // performed should be the last operator entered (excluding the negative (-) sign).
          // For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7);
          // if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).
          if (isOperator(state.lastValue)) {
            if (state.lastValue === formulaValues.subtract) {
              // remove the - sign
              state.arrayFormula.pop()

              // check the value before - sign
              // and remove the value if it is an operator
              if (
                isOperator(
                  state.arrayFormula[state.arrayFormula.length - 1] || "",
                )
              ) {
                state.arrayFormula.pop()
              }

              state.displayValue = action.payload.value
              state.arrayFormula.push(action.payload.value)
              break
            }

            if (action.payload.value !== formulaValues.subtract) {
              state.displayValue = action.payload.value
              state = updateLastValue(state, state.displayValue)
              break
            }
          }

          // User Story #12: I should be able to perform any operation (+, -, *, /) on numbers
          // containing decimal points.
          state.displayValue = action.payload.value
          state.arrayFormula.push(action.payload.value)
          break
        case "=":
          if (state.lastValue === formulaValues.equal) {
            break
          }

          // User Story #9: In any order, I should be able to add, subtract, multiply and divide
          // a chain of numbers of any length, and when I hit =, the correct result should be shown
          // in the element with the id of display.
          state.calculation = safeEval(state.arrayFormula.join(""))
          state.previousCalculation = 0
          state.displayValue = state.calculation + ""
          state.arrayFormula.push(action.payload.value, state.calculation + "")
          break
      }

      if (shouldUpdateLastValue) {
        state.lastValue = action.payload.value
      }
      state.displayFormula = state.arrayFormula.join("")
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
})

export const { addFormula } = calculatorSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getCalculatorState = (state: RootState) => state.calculator

export default calculatorSlice.reducer
