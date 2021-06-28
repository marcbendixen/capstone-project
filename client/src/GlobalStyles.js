import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
:root {
    --color-black: #14171A;
    --color-blue: #38b4f2;
    --color-orange: #ff7500;
    --color-green: #01dc4a;
}

* {
  box-sizing: border-box;
}

#root {
  display: flex;
  justify-content: center;
  width: 100%;
}

html {
  scroll-behavior: smooth;
}

body {
  display: flex;
  justify-content: center;
  font-family: 'Gudea', Helvetica, sans-serif;
  line-height: 1.5;
  color: #fff;
  background-color: var(--color-black);
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
