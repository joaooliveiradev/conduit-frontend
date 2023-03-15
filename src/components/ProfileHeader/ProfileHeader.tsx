import styled, { css } from 'styled-components'
import { Button as DefaultButton } from '@/components/Button/Button'
import { ProfileInformation, TextButton } from '@/components/index'
import Link from 'next/link'

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
  user-select: none;
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
const Button = styled(DefaultButton)`
  min-width: 100px;
`

const NewArticle = () => (
  <Link href="/new-article">
    <Button size="medium">New Article</Button>
  </Link>
)

export const ProfileHeader = ({ name, description }: ProfileHeaderProps) => (
  <Wrapper>
    <ProfileInformation name={name} description={description} />
    <Actions>
      <NewArticle />
      {/* TODO: Modal */}
      <TextButton href="/edit-profile">Edit profile</TextButton>
    </Actions>
  </Wrapper>
)