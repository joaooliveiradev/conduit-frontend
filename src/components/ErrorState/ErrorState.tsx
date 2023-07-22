import styled from 'styled-components'

export type ErrorStateProps = {
  children: React.ReactNode
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: ${({ theme }) => theme.spacings.xmedium};
`

export const ErrorStateTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${({ theme }) => theme.spacings.xsmall};
`

export const ErrorStateTitle = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};
`

export const ErrorStateMessage = styled.p`
  color: ${({ theme }) => theme.colors.grey[300]};
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  font-weight: 500;
`

export const ErrorState = ({ children }: ErrorStateProps) => (
  <Wrapper>{children}</Wrapper>
)
