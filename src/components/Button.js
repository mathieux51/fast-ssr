import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 2em;
  margin: 20px 0;
  flex: 70px;
  width: 70%;
  background-color: white;
  border-radius: 5px;
`

const Button = ({ className, children }) => (
  <StyledButton className={className}>{children}</StyledButton>
)

export default Button
