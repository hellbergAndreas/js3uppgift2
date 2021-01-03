import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../UserContext"
import Input from "../components/Input"
import SelectInput from "../components/SelectInput"
import FormKit from "../data/FormKit"
import UserKit from "../data/UserKit"
import styled from "styled-components"
import { StyledButton } from "../pages/SignUpLogin"

// when the form is rendered on the page, it is rendered
//  with up to three props:
// * type:   matches an array  in FormKit.js, the form will
//   loop over the array and print out
//   the corresponding inputs.
// * customerEdit: if customerEdit is sent with the props,
//   the form renders the Inputs from formKit.customer
//   and sets the values of the inputs  to the values from the customerEdit object
// * submit: when the form is submited, the switch
//   in handleSubmit() checks the submit prop for the correct destination
const TheForm = ({ type, customerEdit, submit }) => {
  const userKit = new UserKit()
  const formKit = new FormKit()
  const history = useHistory()
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fieldValues, setFieldValues] = useState()
  const [errorMessage, setErrorMessage] = useState({})

  const { listUpdate, triggerListUpdate, setLoggedIn } = useContext(UserContext)

  //  to have controlled inputs, an initial value is set
  //   by looping over the fields in formKit[type].
  //  if a field has an option value, the value is set to option nr 1,
  //  if it does not have an option value, the input will be
  //  a regular input and its initial value will be set to ""
  useEffect(() => {
    let form = formKit[type]
    let initialFieldState = form.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.name]: cur.options ? cur.options[0] : "",
      }
    }, {})
    setFieldValues(initialFieldState)
    setSubmitted(false)
    setErrorMessage({})
  }, [submitted])

  // if customerEdit-object exists, the initial field-values are set
  // directly from that object.
  useEffect(() => {
    customerEdit && setFieldValues(customerEdit)
  }, [])

  const handleChange = (name, value) => {
    setFieldValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const login = () => {
    userKit
      .login(fieldValues)
      .then((res) => res.json())
      .then((data) => {
        if (data.nonFieldErrors) {
          setErrorMessage({
            serverError: data.nonFieldErrors[0],
          })
        }
        if (data.token) {
          userKit.setSessionToken(data.token)
          triggerListUpdate(!listUpdate)
          history.push("/")
          setLoggedIn(true)
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formKit.validate(type, fieldValues, setErrorMessage)) {
      switch (submit) {
        case "Register":
          userKit
            .register(fieldValues)
            .then((res) => res.status === 201 && setRegisterSuccess(true))

          break
        case "Login":
          login()
          break
        case "Add customer":
          userKit
            .addCustomer(fieldValues)
            .then(() => triggerListUpdate(!listUpdate))
          break
        case "Edit customer":
          userKit
            .updateCustomer(customerEdit.id, fieldValues)
            .then(() => triggerListUpdate(!listUpdate))
            .then(history.push("/"))
          break
        default:
          console.log("default")
      }

      setSubmitted(true)
    }
  }

  return (
    <StyledSection>
      {registerSuccess && (
        <div style={{ color: "green" }}>
          An activation mail has been sent to your mail
        </div>
      )}
      <form>
        {errorMessage.serverError && (
          <p style={{ color: "red" }}>
            Unable to login, please check email and password
          </p>
        )}
        {fieldValues &&
          formKit[type].map((field) => {
            if (field.input === "input") {
              return (
                <Input
                  key={field.name}
                  required={field.required}
                  name={field.name}
                  label={field.name}
                  value={fieldValues[field.name]}
                  handleChange={handleChange}
                  type={field.type}
                  error={errorMessage[field.name]}
                ></Input>
              )
            }
            if (field.input === "select") {
              return (
                <SelectInput
                  key={field.name}
                  name={field.name}
                  label={field.name}
                  value={fieldValues[field.name]}
                  handleChange={handleChange}
                  options={field.options}
                ></SelectInput>
              )
            }
          })}
        <SubmitButton onClick={(e) => handleSubmit(e)}>{submit}</SubmitButton>
      </form>
    </StyledSection>
  )
}

export default TheForm

const StyledSection = styled.section``
const SubmitButton = styled(StyledButton)`
  &:hover {
  }
`
