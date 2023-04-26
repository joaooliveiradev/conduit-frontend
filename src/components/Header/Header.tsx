import {
  Button,
  SignInModal,
  Anchor,
  type DropdownProps,
  type DropdownItemProps,
  type ProfileNameProps,
} from '@/components'
import { useAuth, useCookies } from '@/context'
import { fromNullable, isSome, chain } from 'fp-ts/Option'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { getUseMeKey, useMe } from '@/hooks'
import styled from 'styled-components'
import logo from '@/assets/logo.webp'
import Image from 'next/image'
import { getRight } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

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
