import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { Anchor as DefaultAnchor } from '@/components/Anchor/Anchor'
import {
  Root,
  Portal,
  Content as PopoverContent,
  Trigger as PopoverTrigger,
} from '@radix-ui/react-popover'

export type DropdownProps = {
  children: React.ReactNode
}

export type DropdownTriggerProps = {
  children: React.ReactNode
}

export type DropdownContentProps = {
  children: React.ReactNode
}

export type DropdownListProps = {
  children: React.ReactNode
}

export type DropdownItemProps = {
  label: string
  href?: string
  onEventClick?: () => void
}

export const DropdownTrigger = styled(PopoverTrigger)`
  ${({ theme }) => css`
    appearance: none;
    all: unset;
    cursor: pointer;
    border-radius: 8px;
    padding: ${theme.spacings.small} ${theme.spacings.xxsmall};
    &:focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
    }
    &:hover {
      background-color: ${transparentize(0.88, theme.colors.black[200])};
    }
  `}
`

const Content = styled(PopoverContent)`
  ${({ theme }) => css`
    border: 1px solid ${transparentize(0.88, theme.colors.black[200])};
    background-color: ${theme.colors.white[100]};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxxsmall};
    border-radius: 8px;
    max-width: calc(100vw - 32px);
  `}
`

export const DropdownList = styled.ul`
  background-color: ${({ theme }) => theme.colors.white[100]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.small};
  word-break: break-word;
`

const Item = styled.li`
  border-radius: 6px;
  list-style-type: none;
  &:hover {
    background-color: ${({ theme }) =>
      transparentize(0.88, theme.colors.black[200])};
  }
`

const Anchor = styled(DefaultAnchor)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    color: ${theme.colors.black[100]};
    display: flex;
    justify-content: center;
    font-weight: 700;
    padding: 4px ${theme.spacings.xsmall};
    border-radius: 6px;
    &:focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
    }
  `}
`

const Button = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    color: ${theme.colors.black[100]};
    display: flex;
    justify-content: center;
    font-weight: 700;
    padding: 4px ${theme.spacings.xsmall};
    border-radius: 6px;
    background-color: unset;
    cursor: pointer;
    &:focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
    }
  `}
`

export const Dropdown = ({ children }: DropdownProps) => <Root>{children}</Root>

export const DropdownContent = ({ children }: DropdownProps) => (
  <Portal>
    <Content sideOffset={16} collisionPadding={16}>
      {children}
    </Content>
  </Portal>
)

export const DropdownItem = ({
  label,
  href,
  onEventClick,
}: DropdownItemProps) => {
  return (
    <Item>
      {href ? (
        <Anchor href={href}>{label}</Anchor>
      ) : (
        <Button onClick={onEventClick}>{label}</Button>
      )}
    </Item>
  )
}
