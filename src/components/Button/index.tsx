import { Loading } from '@components/Loading'
import { HTMLAttributes } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: string
  size: 'large' | 'medium'
  disabled?: boolean
  isLoading?: boolean
  block?: boolean
}

const sizeModifiers = {
  medium: (theme: DefaultTheme) => css`
    height: ${theme.spacings.large};
    font-size: ${theme.fonts.sizes.large};
  `,
  large: (theme: DefaultTheme) => css`
    height: ${theme.spacings.xlarge};
    font-size: ${theme.fonts.sizes.xlarge};
  `,
}

const Wrapper = styled.button<Omit<ButtonProps, 'children'>>`
  ${({ theme, size, disabled, block }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 12.4rem;
    width: ${block ? '100%' : 'auto'};
    padding: 0 10px;
    color: ${theme.colors.white[100]};
    background-color: ${theme.colors.black[200]};
    font-weight: bold;
    border-radius: 2px;
    cursor: pointer;
    ${size && sizeModifiers[size](theme)};
    ${disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
    :hover {
      background-color: ${theme.colors.black[300]};
    }
    :focus {
      box-shadow: 0px 0px 0 2px ${theme.colors.grey[200]};
    }
  `};
`

const Button = ({
  children,
  size,
  disabled,
  isLoading,
  block = false,
  ...rest
}: ButtonProps) => {
  return (
    <Wrapper size={size} disabled={disabled} block={block} {...rest}>
      {isLoading ? <Loading /> : children}
    </Wrapper>
  )
}

export default Button
