import Avatar from '@components/Avatar'
import Button from '@components/Button'
import Input from '@components/Input'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button size="large" block>
        Sign in
      </Button>
      <Input placeholder="Email" />
      <Avatar size={1} name="A" />
    </>
  )
}

export default Home
