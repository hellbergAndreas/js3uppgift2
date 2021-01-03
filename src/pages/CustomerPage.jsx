import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import TheForm from "../containers/TheForm"
import UserKit from "../data/UserKit"
import { UserContext } from "../UserContext"
import styled from "styled-components"
import { StyledFormWrapper } from "./Home"
import Header from "../containers/Header"
import { StyledButton } from "./SignUpLogin"
import FormKit from "../data/FormKit"

// with the id set in props, customerpage fetches the customer and renders it on the page
// the customer is saved to customer state,
// and on delete customer.id is used to remove the user from the db
// if editCustomer button is pressed,
// TheForm will be rendered with the customer settings, with customer to edit information

const CustomerPage = (props) => {
  const formKit = new FormKit()
  const history = useHistory()
  const userKit = new UserKit()
  const [customer, setCustomer] = useState({})
  const [editCustomer, setEditCustomer] = useState(false)
  const { listUpdate, triggerListUpdate } = useContext(UserContext)

  useEffect(() => {
    const id = props.match.params.id
    userKit
      .getCustomer(id)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
  }, [])

  const handleDelete = () => {
    userKit
      .deleteCustomer(customer.id)
      .then(() => triggerListUpdate(!listUpdate))
    history.push("/home")
  }
  const handleEdit = () => {
    setEditCustomer(!editCustomer)
  }

  return (
    <div>
      <StyledBackButton onClick={() => history.push("/")}>
        Back
      </StyledBackButton>
      {customer &&
        formKit.customer.map((field) => {
          console.log(field)
          return (
            <p>
              {field.label}: {customer[field.name]}
            </p>
          )
        })}
      <StyledButton onClick={handleEdit}>
        {editCustomer ? "hide" : "edit"}
      </StyledButton>
      <StyledDeleteButton onClick={handleDelete}>delete</StyledDeleteButton>
      {editCustomer && (
        <StyledFormWrapper>
          {
            <TheForm
              submit="Edit customer"
              customerEdit={customer}
              type="customer"
            />
          }
        </StyledFormWrapper>
      )}
    </div>
  )
}

export default CustomerPage

const StyledBackButton = styled(StyledButton)`
  width: 50px;

  background-color: black;
  &:hover {
    background-color: rgb(45, 45, 45);
  }
`
const StyledDeleteButton = styled(StyledButton)`
  background-color: #bc4242e4;
  border: 1px solid #bc4242e4;
  margin-left: 20px;
  &:hover {
    background-color: #d56868e4;
  }
`
