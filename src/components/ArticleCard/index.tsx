import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import ProfileName from '@components/ProfileName'

const Wrapper = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    border-radius: 2px;
    padding: 32px;
    row-gap: 16px;
    :hover {
      background-color: ${transparentize(0.86, theme.colors.black[100])};
    }
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
  `}
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};
  `}
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`

const InfoWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`

const InfoText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 600;
  `}
`

const Divider = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grey[300]};
    font-size: ${theme.fonts.sizes.medium};
  `}
`

export const ArticleCard = () => {
  return (
    <Wrapper>
      <header>
        <Title>Toward a Journalistic Ethic of Citation</Title>
      </header>
      <section>
        <Text>
          After The New York Times published its extensive report on the history
          of Haiti’s impoverishment at the hands.
        </Text>
      </section>
      <Footer>
        <ProfileName name="Jeff Jarvis" size={2} />
        <InfoWrapper>
          <InfoText>3min</InfoText>
          <Divider>{`//`}</Divider>
          <InfoText>May 26, 2022</InfoText>
        </InfoWrapper>
      </Footer>
    </Wrapper>
  )
}
