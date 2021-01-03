import React from "react"
import styled from "styled-components"

const SelectInput = ({ label, name, handleChange, options }) => {
  return (
    <StyledInputWrapper>
      <StyledLabel>{label}</StyledLabel>

      <StyledSelect
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        name={name}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </StyledSelect>
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
`
const StyledLabel = styled.label``

const StyledSelect = styled.select`
  height: 25px;
  width: 55px;
`
export default SelectInput
