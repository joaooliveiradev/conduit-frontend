import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`

const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.fonts.sizes.small};
    font-weight: 600;
  `}
`

const InputWrapper = styled.input<InputProps>`
  ${({ theme, hasError }) => css`
    height: ${theme.spacings.xlarge};
    border-radius: 4px;
    background-color: ${theme.colors.lighterGrey};
    padding-left: 16px;
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 600;
    color: ${hasError ? theme.colors.red : theme.colors.black};
    ::placeholder {
      color: ${theme.colors.grey};
    }
  `}
`

const Input = ({ hasError, ...rest }: InputProps) => {
  return (
    <Wrapper>
      <InputWrapper hasError={hasError} {...rest} />
      {hasError && <ErrorMessage>Some error message</ErrorMessage>}
    </Wrapper>
  )
}

export default Input
