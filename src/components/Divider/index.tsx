import styled, { css } from 'styled-components'

const Wrapper = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grey[300]};
    font-size: ${theme.fonts.sizes.medium};
  `}
`

export const Divider = () => <Wrapper>{`//`}</Wrapper>
