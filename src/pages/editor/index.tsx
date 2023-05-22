import { NewArticle } from '@/components'
import type { GetServerSidePropsContext } from 'next'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Editor = () => {
  return (
    <Wrapper>
      <NewArticle />
    </Wrapper>
  )
}

const oneHour = 3600

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    'Cache-Control',
    `private, max-age=${oneHour}, stale-while-revalidate=${oneHour}`
  )
  return {}
}

export default Editor
