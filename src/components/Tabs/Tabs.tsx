import styled, { css } from 'styled-components'
import {
  Root as TabsRoot,
  List as TabsList,
  Trigger as TabsTrigger,
  Content as TabsContent,
} from '@radix-ui/react-tabs'

export const Tabs = styled(TabsRoot)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.huge};
`

export const Pane = styled(TabsList)`
  display: flex;
  gap: ${({ theme }) => theme.spacings.large};
  box-shadow: 0 1px ${({ theme }) => theme.colors.grey[500]};
`

export const TabsPane = styled(TabsTrigger)`
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
      box-shadow: 0 1px ${theme.colors.black[400]};
    }
    &:focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
    }
    &:hover {
      cursor: pointer;
    }
  `}
`

export const TabContent = styled(TabsContent)`
  &:focus-visible {
    outline: 1px solid transparent;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.black[200]};
  }
`
