import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ErrorMessage } from '@/components/'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  touched?: boolean
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacings.xsmall};
    width: 100%;
  `}
`

const InputWrapper = styled.input<InputProps>`
  ${({ theme, errorMessage, touched }) => css`
    height: ${theme.spacings.xlarge};
    border-radius: 4px;
    background-color: ${transparentize(0.88, theme.colors.black[200])};
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 600;
    outline: 1px solid transparent;
    color: ${errorMessage && touched
      ? theme.colors.red[100]
      : theme.colors.black[200]};
    :focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0px 0px 0 2px ${theme.colors.black[200]};
    }
    ::placeholder {
      color: ${theme.colors.grey[200]};
    }
  `}
`

export const Input = ({ errorMessage, touched, ...rest }: InputProps) => {
  return (
    <Wrapper>
      <InputWrapper
        errorMessage={errorMessage}
        touched={touched}
        autoComplete="off"
        {...rest}
      />
      {errorMessage && touched && (
        <ErrorMessage message={errorMessage} fontWeight="bold" />
      )}
    </Wrapper>
  )
}
