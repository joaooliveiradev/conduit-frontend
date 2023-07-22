import {
  Button,
  ErrorState,
  ErrorStateIcon,
  ErrorStateMessage,
  ErrorStateTextContent,
  ErrorStateTitle,
} from '@/components'
import { useRouter } from 'next/router'

const Custom404 = () => {
  const router = useRouter()

  const redirectToHome = () => router.push('/')

  return (
    <ErrorState>
      <ErrorStateIcon />
      <ErrorStateTextContent>
        <ErrorStateTitle>Oh no! Error 404</ErrorStateTitle>
        <ErrorStateMessage>
          This page doesn&apos;t exist or was removed.
        </ErrorStateMessage>
      </ErrorStateTextContent>
      <Button size="large" onClick={redirectToHome}>
        Back to home
      </Button>
    </ErrorState>
  )
}

export default Custom404
