import { useAuth } from '@/context'
import { Button, type SignInModalProps } from '@/components'
import styled from 'styled-components'
import React from 'react'
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: ${({ theme }) => theme.spacings.xxsmall};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xxhuge};
  line-height: 55px;
  letter-spacing: -0.055em;
  color: ${({ theme }) => theme.colors.black[100]};
  font-weight: 700;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};
  letter-spacing: -0.035em;
  line-height: 34px;
  max-width: 508px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey[200]};
`

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const { status } = useAuth()

  const showModal = () => setIsModalOpen(true)

  return (
    <Wrapper>
      <Title>Stay curious.</Title>
      <Description>
        Discover stories, thinking, and expertise from writers on any topic.
      </Description>
      {status !== 'loggedIn' && (
        <>
          <Button size="large" onClick={showModal}>
            Create account
          </Button>
          <SignInModal
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
            showSignInFirst={false}
          />
        </>
      )}
    </Wrapper>
  )
}
