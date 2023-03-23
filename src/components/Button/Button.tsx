import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  size: 'large' | 'medium'
  disabled?: boolean
  isLoading?: boolean
  block?: boolean
}

const sizeModifiers = {
  medium: (theme: DefaultTheme) => css`
    height: ${theme.spacings.large};
    font-size: ${theme.fonts.sizes.medium};
    line-height: 2.1rem;
  `,
  large: (theme: DefaultTheme) => css`
    height: ${theme.spacings.xlarge};
    font-size: ${theme.fonts.sizes.xmedium};
    line-height: 2.3rem;
  `,
}

const Wrapper = styled.button<Omit<ButtonProps, 'children'>>`
  ${({ theme, size, disabled, block }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 130px;
    width: ${block ? '100%' : 'auto'};
    padding: 0 ${theme.spacings.xsmall};
    color: ${theme.colors.white[100]};
    background-color: ${theme.colors.black[200]};
    font-weight: bold;
    border-radius: 2px;
    cursor: pointer;
    letter-spacing: -0.055em;
    transition: background-color 250ms ease-in;
    ${size && sizeModifiers[size](theme)};
    ${disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
    &:hover {
      background-color: ${theme.colors.black[300]};
    }
    &:focus {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.grey[200]};
    }
  `};
`

const Loading = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #595a5b;
  border-top: 2px solid #f3f6f9;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, disabled, block, isLoading, children, ...rest }, ref) => {
    return (
      <Wrapper
        size={size}
        disabled={disabled}
        block={block}
        ref={ref}
        {...rest}
      >
        {isLoading ? <Loading role="status" aria-label="Loading" /> : children}
      </Wrapper>
    )
  }
)
