import styled, { css } from 'styled-components'
import { type Status } from '@/context'
import { SignInModal, Button } from '@/components'
import React from 'react'

export type HeroProps = {
  userStatus: Status
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: ${theme.spacings.xxsmall};
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxhuge};
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
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

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
