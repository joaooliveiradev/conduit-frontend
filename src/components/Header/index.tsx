import { Dropdown, DropdownItem } from '@components/Dropdown'
import logo from '@assets/logo.webp'
import Button from '@components/Button'
import ProfileName from '@components/ProfileName'
import Image from 'next/image'
import styled from 'styled-components'
import SignInModal from '@components/Form/SignInModal'
import { useEffect, useState } from 'react'
import { useAuth } from '@context/auth'

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  const [username, setUsername] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { status, signOut } = useAuth()
  useEffect(() => {
    if (status == 'loggedIn') {
      const storageUsername = localStorage.getItem('username')
      const username = storageUsername ? storageUsername : ''
      setUsername(username)
      setIsModalOpen(false)
    }
  }, [status])
  return (
    <Wrapper>
      <Image src={logo} alt="Conduit Logo" />
      {status == 'loggedIn' && (
        <Dropdown trigger={<ProfileName size={2} name={username} />}>
          <DropdownItem href="profile" label="Profile" />
          <DropdownItem label="Sign Out" handleClick={signOut} />
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
          />
        </>
      )}
    </Wrapper>
  )
}
