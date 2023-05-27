import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
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
    }
    html,
    body {
      font-size: 62.5%;
      font-family: 'DM Sans', sans-serif;
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
      background-color: #FAFAFA;
  }
`
