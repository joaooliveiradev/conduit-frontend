import * as Popover from '@radix-ui/react-popover'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ReactNode } from 'react'
import Link from 'next/link'

export interface DropdownProps extends Popover.PopoverContentProps {
  children: ReactNode
  trigger: ReactNode
}

export type DropdownItemProps = {
  label: string
  href: string
}

const Trigger = styled(Popover.Trigger)`
  ${({ theme }) => css`
    appearance: none;
    all: unset;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 8px;
    :focus-visible {
      box-shadow: 0 0 0 2px ${transparentize(0.6, theme.colors.black[200])};
    }
    :hover {
      background-color: ${transparentize(0.88, theme.colors.black[200])};
    }
  `}
`

const Content = styled(Popover.Content)`
  ${({ theme }) => css`
    border: 1px solid ${transparentize(0.88, theme.colors.black[200])};
    background-color: ${theme.colors.white[100]};
    padding: 16px 18px;
    border-radius: 8px;
    max-width: calc(100vw - 32px);
  `}
`

const List = styled.ul`
  ${({ theme }) => css`
    background-color: ${theme.colors.white[100]};
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    word-break: break-word;
  `}
`

const Item = styled.li`
  ${({ theme }) => css`
    border-radius: 6px;
    :hover {
      background-color: ${transparentize(0.88, theme.colors.black[200])};
    }
  `}
`

const Anchor = styled.a`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    color: ${theme.colors.black[100]};
    display: flex;
    justify-content: center;
    font-weight: 700;
    padding: 4px ${theme.spacings.small};
    border-radius: 6px;
    :focus-visible {
      box-shadow: 0 0 0 2px ${transparentize(0.6, theme.colors.black[200])};
    }
  `}
`

const Dropdown = ({ children, trigger }: DropdownProps) => {
  return (
    <Popover.Root>
      <Trigger>{trigger}</Trigger>
      <Popover.Portal>
        <Content sideOffset={16} collisionPadding={16}>
          <List>{children}</List>
        </Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const DropdownItem = ({ label, href }: DropdownItemProps) => {
  return (
    <Item>
      <Link href={href} passHref>
        <Anchor>{label}</Anchor>
      </Link>
    </Item>
  )
}

export { Dropdown, DropdownItem }
