import styled from 'styled-components'

export type EmptyStateProps = {
  children: React.ReactNode
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${({ theme }) => theme.spacings.large};
`

export const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${({ theme }) => theme.spacings.xsmall};
`

export const EmptyStateTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};
`

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  color: ${({ theme }) => theme.colors.grey[300]};
  font-weight: 500;
`

export const EmptyState = ({ children }: EmptyStateProps) => (
  <Wrapper>{children}</Wrapper>
)

