import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
:root {
    --color-main-bg: #14171A;
}

* {
  box-sizing: border-box;
}

#root {
  display: flex;
  justify-content: center;
  width: 100%;
}

body {
  display: flex;
  justify-content: center;
  font-family: 'Gudea', Helvetica, sans-serif;
  line-height: 1.5;
  color: #fff;
  background-color: var(--color-main-bg);
  scroll-behavior: smooth;
}

h1, h2, h3 {
  font-family: 'Domine', 'Times New Roman',  serif;
  letter-spacing: 0.04em;
}

h1 {
  font-weight: bold;
}

a, a:active, a:visited {
  color: #fff;
}
`

export default GlobalStyles
