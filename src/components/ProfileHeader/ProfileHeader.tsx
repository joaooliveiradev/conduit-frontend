import { Button as DefaultButton } from '@/components/Button/Button'
import { ProfileInformation, TextButton } from '@/components'
import { useMe } from '@/hooks'
import { pipe } from 'fp-ts/function'
import { fromNullable, chain, getRight } from 'fp-ts/Option'
import { useAuth } from '@/context'
import { exists } from 'fp-ts/Option'
import styled from 'styled-components'
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
  display: flex;
  gap: ${({ theme }) => theme.spacings.xmedium};
  align-items: center;
  position: absolute;
  right: 0;
`

const Button = styled(DefaultButton)`
  min-width: 100px;
`

const NewArticleBtn = () => (
  <Link href="/editor" prefetch={false}>
    <Button size="medium">New Article</Button>
  </Link>
)

export const ProfileHeader = ({ name, description }: ProfileHeaderProps) => {
  const { data } = useMe()
  const { status } = useAuth()

  const isYourProfile = pipe(
    data,
    fromNullable,
    chain(getRight),
    exists(({ user }) => user.username === name)
  )

  return (
    <Wrapper>
      <ProfileInformation name={name} description={description} />
      {status === 'loggedIn' && isYourProfile && (
        <Actions>
          <NewArticleBtn />
          {/* TODO: Modal */}
          <TextButton href="/edit-profile">Edit profile</TextButton>
        </Actions>
      )}
    </Wrapper>
  )
}
