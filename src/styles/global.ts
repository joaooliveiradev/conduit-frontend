import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
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
    font-family: 'DM Sans', sans-serif;
  }
  html,
  body {
    font-size: 62.5% ;
    font-family: 'DM Sans', sans-serif;
    background-color: #FAFAFA;
    a {
      text-decoration: none;
      color: inherit;
      :hover {
        color: inherit;
      }
    }
  }
  #__next {
    min-height: 100vh;
    display: flex;
  }
`
