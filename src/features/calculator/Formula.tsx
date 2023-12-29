import React from "react"
import { useAppSelector } from "../../app/hooks"
import { getCalculatorState } from "./calculatorSlice"

export default function Formula(props: any) {
  const calculator = useAppSelector(getCalculatorState)
  return (
    <div className="text-end mb-1" style={{ minHeight: 29 }}>
      {calculator.displayFormula}
    </div>
  )
}
