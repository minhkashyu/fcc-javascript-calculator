import React from "react"

import Button from "./features/calculator/Button"
import Display from "./features/calculator/Display"
import Formula from "./features/calculator/Formula"
import Footer from "./features/Footer"

import { formulaValues } from "./features/calculator/calculatorSlice"

function App() {
  return (
    <div className="App container">
      <div
        className="calculator bg-dark text-white p-2 mx-auto mt-5 rounded-3"
        style={{ width: 300 }}
      >
        <Formula />
        <Display />

        <div className="row g-0">
          <div className="col-6">
            <Button
              btnClassName="btn btn-danger"
              btnId="clear"
              btnText="AC"
              btnValue={formulaValues.clear}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-info"
              btnId="divide"
              btnText="/"
              btnValue={formulaValues.divide}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-info"
              btnId="multiply"
              btnText="x"
              btnValue={formulaValues.multiply}
            />
          </div>

          <div className="col-3">
            <Button
              btnClassName="btn btn-secondary"
              btnId="seven"
              btnText="7"
              btnValue={formulaValues.seven}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-secondary"
              btnId="eight"
              btnText="8"
              btnValue={formulaValues.eight}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-secondary"
              btnId="nine"
              btnText="9"
              btnValue={formulaValues.nine}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-info"
              btnId="subtract"
              btnText="-"
              btnValue={formulaValues.subtract}
            />
          </div>

          <div className="col-3">
            <Button
              btnClassName="btn btn-secondary"
              btnId="four"
              btnText="4"
              btnValue={formulaValues.four}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-secondary"
              btnId="five"
              btnText="5"
              btnValue={formulaValues.five}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-secondary"
              btnId="six"
              btnText="6"
              btnValue={formulaValues.six}
            />
          </div>
          <div className="col-3">
            <Button
              btnClassName="btn btn-info"
              btnId="add"
              btnText="+"
              btnValue={formulaValues.add}
            />
          </div>

          <div className="col-12">
            <div className="row g-0">
              <div className="col-9">
                <div className="row g-0">
                  <div className="col-4">
                    <Button
                      btnClassName="btn btn-secondary"
                      btnId="one"
                      btnText="1"
                      btnValue={formulaValues.one}
                    />
                  </div>
                  <div className="col-4">
                    <Button
                      btnClassName="btn btn-secondary"
                      btnId="two"
                      btnText="2"
                      btnValue={formulaValues.two}
                    />
                  </div>
                  <div className="col-4">
                    <Button
                      btnClassName="btn btn-secondary"
                      btnId="three"
                      btnText="3"
                      btnValue={formulaValues.three}
                    />
                  </div>

                  <div className="col-8">
                    <Button
                      btnClassName="btn btn-secondary"
                      btnId="zero"
                      btnText="0"
                      btnValue={formulaValues.zero}
                    />
                  </div>
                  <div className="col-4">
                    <Button
                      btnClassName="btn btn-secondary"
                      btnId="decimal"
                      btnText="."
                      btnValue={formulaValues.decimal}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <Button
                  btnClassName="btn btn-success h-100"
                  btnId="equals"
                  btnText="="
                  btnValue={formulaValues.equal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
