import React from "react"
import { useAppSelector } from "../../app/hooks"
import { getCalculatorState } from "./calculatorSlice"

export default function Display(props: any) {
  const calculator = useAppSelector(getCalculatorState)
  return (
    <div id="display" className="text-end mb-2">
      {calculator.displayValue}
    </div>
  )
}
