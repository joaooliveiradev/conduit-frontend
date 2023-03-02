import styled, { css } from 'styled-components'
import { Avatar, ProfileDescription } from '@/components'

export type ProfileInformationProps = {
  name: string
  description: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    gap: ${theme.spacings.xmedium};
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`

export const ProfileInformation = ({
  name,
  description,
}: ProfileInformationProps) => {
  return (
    <Wrapper>
      <Avatar name={name} size={6} />
      <ProfileDescription name={name} description={description} />
    </Wrapper>
  )
}
