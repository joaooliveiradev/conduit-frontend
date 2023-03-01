import styled, { css } from 'styled-components'
import * as TabsRadix from '@radix-ui/react-tabs'

export const Tabs = styled(TabsRadix.Root)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.huge};
  `}
`

export const Pane = styled(TabsRadix.List)`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.large};
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
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
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
