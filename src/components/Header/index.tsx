import {
  Button,
  ProfileName,
  SignInModal,
  Dropdown,
  DropdownItem,
} from '@/components'
import logo from '@/assets/logo.webp'
import Image from 'next/image'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context'
import { useMe } from '@/hooks/queries'
import { getUsername } from '@/utils/user'
import { isSome } from 'fp-ts/lib/Option'

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 72px;
`

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { status, signOut } = useAuth()
  const { data } = useMe()

  useEffect(() => {
    if (status === 'loggedIn') setIsModalOpen(false)
  }, [status])

  const maybeUsername = getUsername(data)

  return (
    <Wrapper>
      <Image src={logo} alt="Conduit Logo" width={172} height={42} />
      {status == 'loggedIn' && isSome(maybeUsername) && (
        <Dropdown trigger={<ProfileName size={2} name={maybeUsername.value} />}>
          <DropdownItem href="profile" label="Profile" />
          <DropdownItem label="Sign Out" onEventClick={signOut} />
        </Dropdown>
      )}
      {(status === 'idle' || status === 'loggedOut') && (
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
