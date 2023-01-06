import styled, { css } from 'styled-components'

type fontWeightValues = 'normal' | 'medium' | 'bold'
type textAlignValues = 'start' | 'center' | 'end'

export type ErrorMessageProps = {
  message: string
  fontWeight?: fontWeightValues
  textAlign?: textAlignValues
}

const Text = styled.p<Omit<ErrorMessageProps, 'message'>>`
  ${({ theme, fontWeight, textAlign }) => css`
    color: ${theme.colors.red[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: ${fontWeight};
    text-align: ${textAlign};
  `}
`

export const ErrorMessage = ({
  message,
  fontWeight = 'normal',
  textAlign = 'start',
}: ErrorMessageProps) => (
  <Text fontWeight={fontWeight} textAlign={textAlign}>
    {message}
  </Text>
)
