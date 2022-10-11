import styled, { css } from 'styled-components'

type ErrorMessageProps = {
  errorMessage: string
}

const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red[100]};
    font-size: ${theme.fonts.sizes.medium};
    text-align: center;
  `}
`

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => (
  <Text>{errorMessage}</Text>
)

export default ErrorMessage
