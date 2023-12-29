import React from "react"

import { useAppDispatch } from "../../app/hooks"
import { addFormula } from "./calculatorSlice"

export default function Button(props: any) {
  const dispatch = useAppDispatch()

  return (
    <button
      className={
        "w-100 rounded-2 border border-1 border-dark " + props.btnClassName
      }
      id={props.btnId}
      onClick={() => {
        dispatch(addFormula({ value: props.btnValue }))
      }}
    >
      {props.btnText}
    </button>
  )
}
