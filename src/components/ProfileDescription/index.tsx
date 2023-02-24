import styled, { css } from 'styled-components'
import { ProfileAuthor } from '@/components/ProfileAuthor'

export type ProfileDescriptionProps = {
  name: string
  description: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacings.xxsmall};
    max-width: 460px;
  `}
`

const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grey[200]};
    font-size: ${theme.fonts.sizes.xmedium};
    text-align: center;
  `}
`

export const ProfileDescription = ({
  name,
  description,
}: ProfileDescriptionProps) => (
  <Wrapper>
    <ProfileAuthor author={name} />
    <Description>{description}</Description>
  </Wrapper>
)
