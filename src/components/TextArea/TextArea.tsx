import { transparentize } from 'polished'
import styled, { css } from 'styled-components'
import { type ErrorFieldMessageProps } from '@/components'
import React, { useId } from 'react'
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

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string
  className?: string
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xsmall};
`

const TextAreaWrapper = styled.textarea<TextAreaProps>`
  ${({ theme }) => css`
    min-height: 230px;
    height: 100%;
    white-space: pre-wrap;
    border-radius: 4px;
    background-color: ${transparentize(0.88, theme.colors.black[200])};
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    font-size: ${theme.fonts.sizes.xmedium};
    resize: none;
    color: ${theme.colors.black[200]};
    &::placeholder {
      color: ${theme.colors.grey[200]};
    }
    &:focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.black[200]};
      margin: 0 2px;
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

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ errorMessage, 'aria-label': ariaLabel, ...rest }, ref) => {
    const errorId = useId()
    return (
      <Wrapper>
        {ariaLabel && <Label>{ariaLabel}</Label>}
        <TextAreaWrapper
          autoComplete="off"
          ref={ref}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={errorMessage ? errorId : undefined}
          {...rest}
        />
        {errorMessage && (
          <ErrorFieldMessage
            id={errorId}
            message={errorMessage}
            fontWeight="bold"
            textAlign="start"
          />
        )}
      </Wrapper>
    )
  }
)
