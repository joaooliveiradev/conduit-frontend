import logo from '@assets/logo.webp'
import Button from '@components/Button'
import ProfileName from '@components/ProfileName'
import Image from 'next/image'
import styled from 'styled-components'

export type HeaderProps = {
  userLogged: boolean
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`

export const Header = ({ userLogged }: HeaderProps) => {
  return (
    <Wrapper>
      <Image src={logo} alt="Conduit Logo" />
      {userLogged ? (
        <ProfileName size={2} name="Jeff Jarvis" />
      ) : (
        <Button size="large">Sing in</Button>
      )}
    </Wrapper>
  )
}
