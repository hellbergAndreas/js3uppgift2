import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import UserKit from "../data/UserKit"
import CustomerList from "../components/CustomerList"
import TheForm from "../containers/TheForm"

import styled from "styled-components"
import { StyledButton } from "./SignUpLogin"

// homepage checks if user has token, if not, user will be redirected to login/sign-up page
// if add button is pressed, TheForm will render with add-customer settings
const Home = () => {
  const userKit = new UserKit()
  const history = useHistory()
  const [addCustomer, setAddCustomer] = useState(false)

  useEffect(() => {
    !userKit.getSessionToken() && history.push("/login")
  }, [])

  const handleClick = () => {
    setAddCustomer(!addCustomer)
  }
  return (
    <div>
      <CustomerList />
      <StyledButton onClick={handleClick}>
        {!addCustomer ? "add" : "hide"}
      </StyledButton>
      <StyledFormWrapper>
        {addCustomer && <TheForm submit="Add customer" type="customer" />}
      </StyledFormWrapper>
    </div>
  )
}

export default Home

export const StyledFormWrapper = styled.div`
  width: 400px;
`
