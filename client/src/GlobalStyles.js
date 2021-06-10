import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

#root {
  width: 100%;
}

body {
  display: flex;
  justify-content: center;
  font-family: Helvetica, sans-serif;
  line-height: 1.25;
  color: #fff;
  background-color: #171717;
  scroll-behavior: smooth;
}

a, a:active, a:visited {
  color: #fff;
}
`

export default GlobalStyles
