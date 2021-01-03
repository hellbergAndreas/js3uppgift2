import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import TheForm from "../containers/TheForm"
import UserKit from "../data/UserKit"
import styled from "styled-components"

// by default TheForm is rendered with "register"-settings,
// if alreadyMember is true, TheForm will render with "Login"-settings
// if user comes from the activation-email,
// uid and token will be set and "activate"-button renders.
// when pressed, alreadyMember is set to true and login form will render
const SignUpLogin = () => {
  const [alreadyMember, setAlreadyMember] = useState(false)
  const [activationTokens, setActivationTokens] = useState({})

  const history = useHistory()
  const userkit = new UserKit()
  const searchString = history.location.search
  const urlParameters = new URLSearchParams(searchString)

  useEffect(() => {
    let uid = urlParameters.get("uid")
    let token = urlParameters.get("token")
    setActivationTokens({ uid, token })
  }, [])

  const handleActivate = () => {
    userkit.activateUser(activationTokens.uid, activationTokens.token)
    setActivationTokens({})
    setAlreadyMember(true)
  }
  const form = () => {
    if (alreadyMember) {
      return <TheForm submit="Login" type="login" />
    } else {
      return (
        <div>
          <TheForm submit="Register" type="register" />{" "}
          <StyledButton onClick={() => setAlreadyMember(true)}>
            Already Registered?
          </StyledButton>
        </div>
      )
    }
  }
  return (
    <StyledSection>
      <StyledCard>
        {activationTokens.uid && activationTokens.token ? (
          <button onClick={handleActivate}>Activate User</button>
        ) : (
          form()
        )}
      </StyledCard>
    </StyledSection>
  )
}

export default SignUpLogin

const StyledCard = styled.div`
  width: 400px;
  padding: 70px 170px;
  border-radius: 8px;
  box-shadow: 10px 10px 26px -5px rgba(0, 0, 0, 0.21);
  max-height: auto;
`
const StyledSection = styled.section`
  width: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5%;
`
export const StyledButton = styled.button`
  height: 45px;
  width: 167px;
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  font-weight: bold;
  border: 1px solid rgba(182, 209, 255);
  background-color: #4373d9;
  color: white;
  &:hover {
    background-color: #6d96ed;
    font-size: 15px;
  }
`
