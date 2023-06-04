import type { GetServerSidePropsContext } from 'next'
import { NewArticle } from '@/components'
import { NextSeo } from 'next-seo'
import { defaultSEO } from '@/pages/_app'
import { useEffect } from 'react'
import { useAuth } from '@/context'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Editor = () => {
  const { status } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!(status === 'loggedIn')) router.replace('/unauthorized')
  }, [status, router])

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
