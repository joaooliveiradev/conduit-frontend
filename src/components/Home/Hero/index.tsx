import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { type Status } from '@/context'

type HeroProps = {
  userStatus: Status
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  padding-bottom: 104px;
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

export const Hero = ({ userStatus }: HeroProps) => (
  <Wrapper>
    <Title>Stay curious.</Title>
    <Description>
      Discover stories, thinking, and expertise from writers on any topic.
    </Description>
    {userStatus === "loggedOut" || userStatus === "idle" && <Button size="large">Create account</Button>}
  </Wrapper>
)
