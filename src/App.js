import React from "react"
import { Route, Switch } from "react-router-dom"
import User from "./UserContext"

import Home from "./pages/Home"

import SignUpLogin from "./pages/SignUpLogin"
import Header from "./containers/Header"
import CustomerPage from "./pages/CustomerPage"
function App() {
  return (
    <Header>
      <Switch>
        <Route path="/customer/:id" component={CustomerPage} />
        <Route path="/login">
          <SignUpLogin />
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Header>
  )
}

export default App
