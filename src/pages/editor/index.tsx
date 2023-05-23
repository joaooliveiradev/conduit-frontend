import type { GetServerSidePropsContext } from 'next'
import { NewArticle } from '@/components'
import { NextSeo } from 'next-seo'
import { defaultSEO } from '@/pages/_app'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Editor = () => {
  return (
    <>
      <NextSeo {...defaultSEO} title="Conduit - New Article" />
      <Wrapper>
        <NewArticle />
      </Wrapper>
    </>
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

  return {
    props: {},
  }
}

export default Editor
