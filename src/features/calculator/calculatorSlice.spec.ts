import calculatorReducer, {
  initialState,
  CalculatorState,
  formulaValues,
  addFormula,
} from "./calculatorSlice"

describe("calculator reducer", () => {
  const initialCalculator: CalculatorState = Object.assign({}, initialState)

  it("should handle initial state", () => {
    expect(calculatorReducer(undefined, { type: "unknown" })).toEqual(
      initialCalculator,
    )
  })

  it("should handle two + three * four = fourteen", () => {
    let actual = calculatorReducer(
      initialCalculator,
      addFormula({
        value: formulaValues.two,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.add,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.three,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.multiply,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.four,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.equal,
      }),
    )

    expect(actual.lastValue).toEqual(formulaValues.equal)
    expect(actual.arrayFormula).toEqual([
      formulaValues.two,
      formulaValues.add,
      formulaValues.three,
      formulaValues.multiply,
      formulaValues.four,
      formulaValues.equal,
      "14",
    ])
    expect(actual.displayFormula).toEqual(actual.arrayFormula.join(""))
    expect(actual.displayValue).toEqual("14")
    expect(actual.calculation).toEqual(14)
    expect(actual.previousCalculation).toEqual(0)
  })

  it("should handle five * - + five = ten", () => {
    let actual = calculatorReducer(
      initialCalculator,
      addFormula({
        value: formulaValues.five,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.multiply,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.subtract,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.add,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.five,
      }),
    )

    actual = calculatorReducer(
      actual,
      addFormula({
        value: formulaValues.equal,
      }),
    )

    expect(actual.lastValue).toEqual(formulaValues.equal)
    expect(actual.arrayFormula).toEqual([
      formulaValues.five,
      formulaValues.add,
      formulaValues.five,
      formulaValues.equal,
      "10",
    ])
    expect(actual.displayFormula).toEqual(actual.arrayFormula.join(""))
    expect(actual.displayValue).toEqual("10")
    expect(actual.calculation).toEqual(10)
    expect(actual.previousCalculation).toEqual(0)
  })
})
