import {
  Button,
  SignInModal,
  type DropdownProps,
  type DropdownItemProps,
  type ProfileNameProps,
} from '@/components'
import logo from '@/assets/logo.webp'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { useAuth, useToast } from '@/context'
import { useMe, UseMeOutput } from '@/hooks/queries'
import { isSome, fromNullable, fromEither, none } from 'fp-ts/Option'
import * as React from 'react'
import { Either, isLeft, isRight } from 'fp-ts/Either'
import { DefaultError, f } from '@/libs'
import dynamic from 'next/dynamic'

const Dropdown = dynamic<DropdownProps>(
  () => import('@/components/Dropdown').then((module) => module.Dropdown),
  { ssr: false }
)
const DropdownItem = dynamic<DropdownItemProps>(
  () => import('@/components/Dropdown').then((module) => module.DropdownItem),
  { ssr: false }
)

const ProfileName = dynamic<ProfileNameProps>(
  () => import('@/components/ProfileName').then((module) => module.ProfileName),
  {
    ssr: false,
  }
)

const Wrapper = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: ${theme.spacings.xxhuge};
  `}
`

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const { signOut, status } = useAuth()
  const { setIsToastOpen } = useToast()

  React.useEffect(() => {
    if (status === 'loggedIn') return setIsModalOpen(false)
  }, [status])

  const handleLeftData = (data: Either<DefaultError, UseMeOutput>) => {
    const dataOption = fromNullable(data)
    const leftData = isSome(dataOption) && isLeft(dataOption.value)
    if (leftData) {
      signOut()
      setIsToastOpen(true)
    }
  }

  const handleError = (error: DefaultError) => {
    signOut()

    return new DefaultError({
      message: error.message,
      name: error.name,
      status: error.status,
    })
  }

  const { data } = useMe({
    enabled: status === 'loggedIn',
    onSuccess: (data) => handleLeftData(data),
    onError: (error) => handleError(error),
  })

  const maybeData = f(() => {
    const dataOption = fromNullable(data)
    if (isSome(dataOption) && isRight(dataOption.value))
      return fromEither(dataOption.value)
    else return none
  })

  return (
    <>
      <Wrapper>
        <Image src={logo} alt="Conduit Logo" width={172} height={42} />
        {isSome(maybeData) ? (
          <Dropdown
            trigger={
              <ProfileName size={2} name={maybeData.value.user.username} />
            }
          >
            <DropdownItem href="profile" label="Profile" />
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
    </>
  )
}
