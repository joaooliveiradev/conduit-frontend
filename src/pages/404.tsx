import { ErrorState } from '@/components'
import { useRouter } from 'next/router'

const Custom404 = () => {
  const router = useRouter()

  const redirectToHome = () => router.push('/')

  return (
    <ErrorState
      title="Oh no! Error 404"
      message="This page doesn't exist or was removed."
      buttonLabel="Back to home"
      onButtonClick={redirectToHome}
    />
  )
}

export default Custom404
