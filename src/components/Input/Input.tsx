import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ErrorFieldMessage } from '@/components/'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  touched?: boolean
  inputRef?: (node: HTMLInputElement | null) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xsmall};
  width: 100%;
`

const InputWrapper = styled.input<InputProps>`
  ${({ theme, errorMessage, touched }) => css`
    height: ${theme.spacings.xlarge};
    border-radius: 4px;
    background-color: ${transparentize(0.88, theme.colors.black[200])};
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 600;
    color: ${errorMessage && touched
      ? theme.colors.red[100]
      : theme.colors.black[200]};
    outline: 1px solid transparent;
    &:focus-visible {
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
    }
    &::placeholder {
      color: ${theme.colors.grey[200]};
    }
  `}
`

export const Input = ({
  errorMessage,
  touched,
  inputRef,
  ...rest
}: InputProps) => {
  return (
    <Wrapper>
      <InputWrapper
        errorMessage={errorMessage}
        touched={touched}
        autoComplete="off"
        ref={inputRef}
        {...rest}
      />
      {errorMessage && touched && (
        <ErrorFieldMessage message={errorMessage} fontWeight="bold" />
      )}
    </Wrapper>
  )
}
