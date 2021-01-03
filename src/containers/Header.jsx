import React, { useContext, useEffect } from "react"
import { UserContext } from "../UserContext"
import styled from "styled-components"
import { StyledButton } from "../pages/SignUpLogin"
import { useHistory } from "react-router-dom"

const Header = ({ children }) => {
  const { currentUser, setCurrentUser, setLoggedIn } = useContext(UserContext)
  const history = useHistory()

  const handleLogOut = () => {
    sessionStorage.clear()
    setCurrentUser(null)
    setLoggedIn(false)
    history.push("/login")
  }
  useEffect(() => {}, [currentUser])

  const renderHeader = () => {
    if (currentUser === null) {
    } else {
      return (
        <StyledHeader>
          <div>
            <p>{currentUser.email}</p>
            <div>
              Logged in as {currentUser.firstName} {currentUser.lastName}
            </div>
          </div>
          <StyledButton onClick={handleLogOut}>log out</StyledButton>
        </StyledHeader>
      )
    }
  }
  return (
    <StyledSection>
      {renderHeader()}
      {children}
    </StyledSection>
  )
}

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const StyledHeader = styled.div`
  padding: 0px 40px;
  height: 120px;
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border-bottom: 1px solid grey;
`

export default Header
