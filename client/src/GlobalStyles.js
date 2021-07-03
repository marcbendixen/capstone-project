import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyles = createGlobalStyle`
  :root {
    --color-black: #14171a;
    --color-blue: #38b4f2;
    --color-orange: #ff7500;
    --color-green: #01dc4a;
    --color-gray-blue: #3c4b5b;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    display: flex;
    justify-content: center;
    font-family: "Gudea", Helvetica, sans-serif;
    line-height: 1.5;
    color: #fff;
    background-color: var(--color-black);
  }

  #root {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  h1,
  h2,
  h3 {
    font-family: "Domine", "Times New Roman", serif;
    letter-spacing: 0.04em;
  }

  h1 {
    font-weight: 700;
  }

  a,
  a:active,
  a:visited {
    color: #fff;
  }
`

export default GlobalStyles
