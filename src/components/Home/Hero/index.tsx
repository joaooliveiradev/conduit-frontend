import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { type Status } from '@/context'
import { useState } from 'react'
import { SignInModal } from '@/components'

type HeroProps = {
  userStatus: Status
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: ${theme.spacings.xxsmall};
    padding-bottom: ${theme.spacings.xxxhuge};
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xhuge};
    line-height: 55px;
    letter-spacing: -0.055em;
    color: ${theme.colors.black[100]};
    font-weight: 700;
  `}
`

const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxlarge};
    letter-spacing: -0.035em;
    line-height: 34px;
    max-width: 508px;
    text-align: center;
    color: ${theme.colors.grey[200]};
  `}
`

export const Hero = ({ userStatus }: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <Wrapper>
      <Title>Stay curious.</Title>
      <Description>
        Discover stories, thinking, and expertise from writers on any topic.
      </Description>
      {(userStatus === 'loggedOut' || userStatus === 'idle') && (
        <>
          <Button size="large" onClick={() => setIsModalOpen(true)}>
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
