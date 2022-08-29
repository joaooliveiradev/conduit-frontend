import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
      &::before,
      &::after {
        box-sizing: inherit;
      }
  }
  *,
  button,
  input {
    border: 0;
    outline: 0;
    font-family: 'DM Sans', sans-serif;
  }
  html,
  body {
    font-size: 62.5% ;
    font-family: 'DM Sans', sans-serif;
    ul {
      list-style-type: none;
    }
    a {
      text-decoration: none;
      color: inherit;
      :hover {
        color: inherit;
      }
    }
  }
`

export default GlobalStyles