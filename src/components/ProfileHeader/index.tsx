import styled, { css } from 'styled-components'
import { ProfileInformation, TextButton, Button } from '@/components'

export type ProfileHeaderProps = {
  name: string
  description: string
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`

const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.xmedium};
    align-items: center;
    position: absolute;
    right: 0;
  `}
`

const NewArticleBtn = styled(Button)`
  min-width: 100px;
`

export const ProfileHeader = ({ name, description }: ProfileHeaderProps) => (
  <Wrapper>
    <ProfileInformation name={name} description={description} />
    <Actions>
      <NewArticleBtn size="medium">New Article</NewArticleBtn>
      <TextButton href="/update">Edit Profile</TextButton>
    </Actions>
  </Wrapper>
)
