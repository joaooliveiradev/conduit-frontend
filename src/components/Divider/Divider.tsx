import styled from 'styled-components'

const Wrapper = styled.span`
  color: ${({ theme }) => theme.colors.grey[300]};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
`

export const Divider = () => <Wrapper>{`//`}</Wrapper>
