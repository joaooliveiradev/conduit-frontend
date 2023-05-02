import {
  Button,
  Anchor,
  type SignInModalProps,
  type DropdownProps,
  type DropdownItemProps,
  type ProfileNameProps,
} from '@/components'
import { useAuth, useCookies } from '@/context'
import { useState, useEffect } from 'react'
import { fromNullable, isSome, chain, getRight } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { getUseMeKey, useMe } from '@/hooks'
import logo from '@/assets/logo.webp'
import styled from 'styled-components'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const SignInModal = dynamic<SignInModalProps>(
  () =>
    import('@/components/SignInModal/SignInModal').then(
      (module) => module.SignInModal
    ),
  {
    ssr: false,
  }
)

const Dropdown = dynamic<DropdownProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then((module) => module.Dropdown),
  { ssr: false }
)

const DropdownItem = dynamic<DropdownItemProps>(
  () =>
    import('@/components/Dropdown/Dropdown').then(
      (module) => module.DropdownItem
    ),
  { ssr: false }
)

const ProfileName = dynamic<ProfileNameProps>(
  () =>
    import('@/components/ProfileName/ProfileName').then(
      (module) => module.ProfileName
    ),
  {
    ssr: false,
  }
)

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { signOut, status } = useAuth()
  const { accessToken } = useCookies()

  useEffect(() => {
    if (status === 'loggedIn') return setIsModalOpen(false)
  }, [status])

  const { data } = useMe({
    enabled: status === 'loggedIn',
    queryKey: getUseMeKey(accessToken),
  })

  const maybeData = pipe(data, fromNullable, chain(getRight))

  return (
    <Wrapper>
      <Anchor href="/">
        <Image src={logo} alt="Conduit Logo" width={172} height={42} />
      </Anchor>
      {isSome(maybeData) && status === 'loggedIn' ? (
        <Dropdown
          trigger={
            <ProfileName size={2} name={maybeData.value.user.username} />
          }
        >
          <DropdownItem
            href={`/profile/${maybeData.value.user.username}`}
            label="Profile"
          />
          <DropdownItem label="Sign Out" onEventClick={signOut} />
        </Dropdown>
      ) : (
        <>
          <Button size="large" onClick={() => setIsModalOpen(true)}>
            Sign in
          </Button>
          <SignInModal
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
            showSignInFirst
          />
        </>
      )}
    </Wrapper>
  )
}
