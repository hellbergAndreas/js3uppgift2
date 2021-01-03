import React from "react"
import styled from "styled-components"

const Input = ({ label, name, handleChange, value, required, type, error }) => {
  return (
    <StyledInputWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledErrorMessage message={error}>{error}</StyledErrorMessage>
      <StyledInput
        required={required}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        name={name}
        value={value}
        type={type}
      ></StyledInput>
    </StyledInputWrapper>
  )
}

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
export const StyledLabel = styled.label`
  font-size: 12px;
  margin-bottom: 3px;
  margin-top: 5px;
`
const StyledErrorMessage = styled.div`
  font-size: 10px;
  color: red;
  position: absolute;
  margin-top: 8px;

  right: -40px;
  background-color: rgb(237, 237, 237);
  border-radius: 8px;
  padding: ${(props) => (props.message ? "8px" : 0)};
`
const StyledInput = styled.input`
  height: 28px;

  border: none;
  border-bottom: 1px solid black;

  &:hover {
    background-color: rgba(182, 209, 255, 0.123);
  }
  &:focus {
    outline: none;
    background-color: rgba(182, 209, 255, 0.123);
    border-bottom: 2px solid rgba(6, 41, 100, 0.823);
  }
`

export default Input
