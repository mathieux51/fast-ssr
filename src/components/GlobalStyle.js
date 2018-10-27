import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

export default createGlobalStyle`
  ${normalize()}
  body {
    background: papayawhip;
  }
  html * {
   font-size: 1em;
   color: #000;
   font-family: Arial !important;
  }

`
