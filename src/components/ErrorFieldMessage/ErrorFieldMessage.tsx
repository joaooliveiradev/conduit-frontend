import styled, { css } from 'styled-components'

type fontWeightValues = 'normal' | 'medium' | 'bold'
type textAlignValues = 'start' | 'center' | 'end'

export type ErrorFieldMessageProps = {
  message: string
  fontWeight?: fontWeightValues
  textAlign?: textAlignValues
}

const Text = styled.p<Omit<ErrorFieldMessageProps, 'message'>>`
  ${({ theme, fontWeight, textAlign }) => css`
    color: ${theme.colors.red[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: ${fontWeight};
    text-align: ${textAlign};
  `}
`

export const ErrorFieldMessage = ({
  message,
  fontWeight = 'normal',
  textAlign = 'start',
}: ErrorFieldMessageProps) => (
  <Text fontWeight={fontWeight} textAlign={textAlign}>
    {message}
  </Text>
)
