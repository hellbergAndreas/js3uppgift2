import React, { useContext } from "react"
import { useHistory } from "react-router-dom"

import { UserContext } from "../UserContext"
import styled from "styled-components"

const CustomerList = () => {
  const history = useHistory()
  const { customerList } = useContext(UserContext)
  const handleClick = (customer) => {
    history.push(`/customer/${customer.id}`)
  }

  return (
    <StyledSection>
      <h1>Customers</h1>
      {customerList &&
        customerList.map((customer, index) => {
          return (
            <ListItem onClick={() => handleClick(customer)}>
              <StyledBullet>
                <StyledInnerBullet>{index + 1}</StyledInnerBullet>
              </StyledBullet>
              <StyledDiv key={customer.id}>
                <p>{customer.name}</p>
              </StyledDiv>
            </ListItem>
          )
        })}
    </StyledSection>
  )
}

export default CustomerList

const StyledBullet = styled.div`
  height: 60px;
  width: 60px;
  background-color: #edecec;
  z-index: 2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledInnerBullet = styled.div`
  height: 40px;
  width: 40px;
  z-index: 4;
  border-radius: 50%;
  background-color: #4373d9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`
const StyledDiv = styled.div`
  font-size: 20px;
  background-color: #edecec;
  border-radius: 8px;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 70px;

  width: 200px;
  margin-left: -50px;
  z-index: -1;
`
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover ${StyledBullet} {
    background-color: #4373d9;
  }
  &:hover ${StyledInnerBullet} {
    background-color: white;
    color: black;
  }
  &:hover ${StyledDiv} {
    background-color: rgba(25, 36, 78, 0.257);
  }
`

const StyledSection = styled.section`
  margin-left: -40px;
`
