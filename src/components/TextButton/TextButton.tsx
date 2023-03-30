import styled, { css } from 'styled-components'
import { Anchor as DefaultAnchor } from '@/components/Anchor/Anchor'

export type TextButtonProps = {
  href: string
  children: React.ReactNode
}

const Anchor = styled(DefaultAnchor)`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 700;
    border-bottom: 2px solid ${theme.colors.black[100]};
    line-height: 21px;
    letter-spacing: -0.02em;
    padding: 0 2px;
    &:hover {
      color: ${theme.colors.black[400]};
    }
    &:focus-visible {
      border: none;
    }
  `}
`

export const TextButton = ({ href, children, ...rest }: TextButtonProps) => (
  <Anchor href={href} {...rest}>
    {children}
  </Anchor>
)
