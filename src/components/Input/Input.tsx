import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ErrorFieldMessage } from '@/components/'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  inputRef?: (node: HTMLInputElement | null) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xsmall};
  width: 100%;
`

const InputWrapper = styled.input<InputProps>`
  ${({ theme, errorMessage }) => css`
    height: ${theme.spacings.xlarge};
    border-radius: 4px;
    background-color: ${transparentize(0.88, theme.colors.black[200])};
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 600;
    color: ${errorMessage ? theme.colors.red[100] : theme.colors.black[200]};
    outline: 1px solid transparent;
    &:focus-visible {
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
    }
    &::placeholder {
      color: ${theme.colors.grey[200]};
    }
  `}
`

export const Input = ({ errorMessage, inputRef, ...rest }: InputProps) => {
  const errorId = React.useId()
  return (
    <Wrapper>
      <InputWrapper
        ref={inputRef}
        errorMessage={errorMessage}
        autoComplete="off"
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        {...rest}
      />
      {errorMessage && (
        <ErrorFieldMessage
          id={errorId}
          message={errorMessage}
          fontWeight="bold"
        />
      )}
    </Wrapper>
  )
}
