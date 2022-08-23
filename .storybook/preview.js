import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/styles/theme'
import GlobalStyles from '../src/styles/global'

const withThemeProvider = (Story, context) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Story {...context} />
  </ThemeProvider>
)

export const decorators = [withThemeProvider]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}