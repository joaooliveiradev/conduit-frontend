import styled from 'styled-components'
import { ProfileAuthor } from '@/components/'

export type ProfileDescriptionProps = {
  name: string
  description: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.xxsmall};
  max-width: 460px;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.grey[200]};
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  line-height: 28px;
  text-align: center;
`

export const ProfileDescription = ({
  name,
  description,
}: ProfileDescriptionProps) => (
  <Wrapper>
    <ProfileAuthor author={name} />
    {description && <Description>{description}</Description>}
  </Wrapper>
)
