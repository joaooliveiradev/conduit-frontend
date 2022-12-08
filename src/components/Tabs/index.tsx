import * as TabsRadix from '@radix-ui/react-tabs'
import styled, { css } from 'styled-components'

export const Tabs = styled(TabsRadix.Root)`
  display: flex;
  flex-direction: column;
  gap: 57px;
`

export const Pane = styled(TabsRadix.List)`
  ${({ theme }) => css`
    display: flex;
    gap: 30px;
    box-shadow: 0px 1px ${theme.colors.grey[500]};
  `}
`

export const TabsPane = styled(TabsRadix.Trigger)`
  ${({ theme }) => css`
    all: unset;
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 700;
    line-height: 23px;
    color: ${theme.colors.grey[200]};
    letter-spacing: -0.055em;
    padding: 10px 20px;
    &[data-state='active'] {
      color: ${theme.colors.black[400]};
      box-shadow: 0px 1px ${theme.colors.black[400]};
    }
    :focus-visible {
      box-shadow: 0 0 0 2px ${theme.colors.black[400]};
    }
    :hover {
      cursor: pointer;
    }
  `}
`

export const TabContent = styled(TabsRadix.Content)`
  ${({ theme }) => css`
    :focus-visible {
      box-shadow: 0 0 0 2px ${theme.colors.black[400]};
    }
  `}
`
