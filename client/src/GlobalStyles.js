import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  color: #fff;
  background-color: #1e1e1e;
  scroll-behavior: smooth;
}
`

export default GlobalStyles
