import { ProfileInformation, type TextButtonProps } from '@/components'
import { useMe } from '@/hooks'
import { pipe } from 'fp-ts/function'
import { fromNullable, chain, getRight } from 'fp-ts/Option'
import { useAuth } from '@/context'
import { exists } from 'fp-ts/Option'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

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

const TextButtonDefault = dynamic<TextButtonProps>(
  () =>
    import('@/components/TextButton/TextButton').then(
      (module) => module.TextButton
    ),
  { ssr: false }
)

const TextButton = styled(TextButtonDefault)`
  position: absolute;
  right: 0;
`

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
        // TODO: MODAL
        <TextButton href="/edit-profile">Edit profile</TextButton>
      )}
    </Wrapper>
  )
}
