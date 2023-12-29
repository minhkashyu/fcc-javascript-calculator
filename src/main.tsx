import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "@fontsource/roboto-condensed" // Defaults to weight 400
import "@fontsource/roboto-condensed/400.css" // Specify weight
import "@fontsource/roboto-condensed/400-italic.css" // Specify weight and style
import "./main.scss"
import App from "./App"

ReactDOM.render(
  // @ts-ignore
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)
