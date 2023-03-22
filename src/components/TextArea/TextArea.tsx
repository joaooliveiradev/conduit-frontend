import { transparentize } from 'polished'
import styled, { css } from 'styled-components'
import { ErrorMessage } from '@/components'

export interface TextAreaProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  touched?: boolean
  errorMessage?: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacings.xsmall};
  `}
`

const TextAreaWrapper = styled.textarea<TextAreaProps>`
  ${({ theme }) => css`
    border-radius: 4px;
    background-color: ${transparentize(0.88, theme.colors.black[200])};
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 600;
    resize: none;
    min-height: 230px;
    color: ${theme.colors.black[200]};
    ::placeholder {
      color: ${theme.colors.grey[200]};
    }
    :focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${theme.colors.grey[200]};
    }
  `}
`

export const TextArea = ({ touched, errorMessage, ...rest }: TextAreaProps) => (
  <Wrapper>
    <TextAreaWrapper autoComplete="off" {...rest} />
    {errorMessage && touched && (
      <ErrorMessage
        message={errorMessage}
        fontWeight="bold"
        textAlign="start"
      />
    )}
  </Wrapper>
)
