import { transparentize } from 'polished'
import { type ErrorFieldMessageProps } from '@/components/'
import styled, { css } from 'styled-components'
import React from 'react'
import dynamic from 'next/dynamic'

const ErrorFieldMessage = dynamic<ErrorFieldMessageProps>(
  () =>
    import('@/components/ErrorFieldMessage/ErrorFieldMessage').then(
      (module) => module.ErrorFieldMessage
    ),
  {
    ssr: false,
  }
)

export type InputProps = {
  errorMessage?: string
  inputRef?: (node: HTMLInputElement | null) => void
} & React.InputHTMLAttributes<HTMLInputElement>

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

const Label = styled.label`
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0, 0, 0, 0);
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: normal;
`

export const Input = ({
  errorMessage,
  inputRef,
  'aria-label': ariaLabel,
  ...rest
}: InputProps) => {
  const errorId = React.useId()
  return (
    <Wrapper>
      {ariaLabel && <Label>{ariaLabel}</Label>}
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
