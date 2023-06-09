import { Button, ErrorStateIcon, SignInModal } from '@/components'
import { useAuth } from '@/context'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.large};
  align-items: center;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};
`

const ErrorDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.xxsmall};
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.small};
  align-items: center;
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  color: ${({ theme }) => theme.colors.grey['300']};
  font-weight: 500;
`

const BoldText = styled.b`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black['400']};
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.large};
`

const Unauthorized = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { status } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loggedIn') router.replace('/editor')
  }, [status, router])

  const showModal = () => setIsModalOpen(true)

  return (
    <Wrapper>
      <ErrorStateIcon />
      <ErrorDescription>
        <Title>Hold up! Error 401</Title>
        <TextWrapper>
          <Text>This page is for signed-in users only.</Text>
          <Text>
            Please return to the <BoldText>homepage</BoldText> or{' '}
            <BoldText>sign in</BoldText>.
          </Text>
        </TextWrapper>
      </ErrorDescription>
      <ButtonWrapper>
        <Link href="/" replace prefetch={false}>
          <Button size="large">Back to home</Button>
        </Link>
        <Button size="large" onClick={showModal}>
          Sign in
        </Button>
        <SignInModal
          open={isModalOpen}
          onOpenChange={(open) => setIsModalOpen(open)}
          showSignInFirst
        />
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Unauthorized
