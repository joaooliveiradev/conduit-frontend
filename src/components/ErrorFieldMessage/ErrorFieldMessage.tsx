import styled, { css } from 'styled-components'

type fontWeightValues = 'normal' | 'bold'
type textAlignValues = 'start' | 'center' | 'end'

export type ErrorFieldMessageProps = {
  message: string
  fontWeight?: fontWeightValues
  textAlign?: textAlignValues
  id?: string
  role?: React.AriaRole
}

const Text = styled.span<Omit<ErrorFieldMessageProps, 'message'>>`
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
  id,
}: ErrorFieldMessageProps) => (
  <Text id={id} fontWeight={fontWeight} textAlign={textAlign}>
    {message}
  </Text>
)
