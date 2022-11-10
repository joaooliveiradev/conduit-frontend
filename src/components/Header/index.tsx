import { Button, ProfileName, SignInModal , Dropdown, DropdownItem } from '@/components'
import logo from '@assets/logo.webp'
import Image from 'next/image'
import styled from 'styled-components'
import { useState } from 'react'
import { useAuth } from '@context/auth'
import { useMe, UseMeOutput } from '@hooks/queries/useMe'
import { useQuery } from '@tanstack/react-query'
import type { DefaultErrorProps } from '@utils/errors'
import { Either, isRight } from 'fp-ts/Either'
import { fromNullable, chain, some, match, none } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { status, signOut } = useAuth()

  const { data } = useQuery<
    Either<DefaultErrorProps, UseMeOutput>,
    DefaultErrorProps
  >(['use-me'], useMe, {
    enabled: status === 'loggedIn',
  })

  const username = pipe(
      data,
      fromNullable,
      chain((data) => isRight(data) ? some(data.right) : none),
      match(() => '', (right) => right.user.username)
    )

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
