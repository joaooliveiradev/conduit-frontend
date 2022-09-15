import { Dropdown, DropdownItem } from '@components/Dropdown'
import logo from '@assets/logo.webp'
import Button from '@components/Button'
import ProfileName from '@components/ProfileName'
import Image from 'next/image'
import styled from 'styled-components'

export type HeaderProps = {
  isUserLoggedIn: boolean
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = ({ isUserLoggedIn }: HeaderProps) => {
  return (
    <Wrapper>
      <Image src={logo} alt="Conduit Logo" />
      {isUserLoggedIn ? (
        <Dropdown trigger={<ProfileName size={2} name="Jeff Jarvis" />}>
          <DropdownItem href="profile" label="Profile" />
          <DropdownItem href="signout" label="Sign Out" />
        </Dropdown>
      ) : (
        <Button size="large">Sign in</Button>
      )}
    </Wrapper>
  )
}
