import { EmptyIcon } from '@/components'
import styled from 'styled-components'

export type EmptyStateProps = {
  message: string
  title: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${({ theme }) => theme.spacings.large};
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${({ theme }) => theme.spacings.xsmall};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  color: ${({ theme }) => theme.colors.grey[300]};
  font-weight: 500;
`

export const EmptyState = ({ message, title }: EmptyStateProps) => {
  return (
    <Wrapper>
      <EmptyIcon />
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{message}</Description>
      </TextWrapper>
    </Wrapper>
  )
}
