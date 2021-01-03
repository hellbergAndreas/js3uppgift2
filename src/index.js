import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import User from "./UserContext"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <User>
        <App />
      </User>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
