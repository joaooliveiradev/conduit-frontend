import { destroyCookies, setCoookies, DefaultError } from '@/utils'
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'
import { parseCookies } from 'nookies'
import { Either, isRight } from 'fp-ts/Either'
import { type SignInResponseOutput  } from '@/components/Form/SignInModal/SignIn/signInMutation'

type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signOut: () => void
  loginHandler: (response: Either<DefaultError, SignInResponseOutput>) => void
}

const defaultValueContext: ContextProps = {
  status: 'idle',
  signOut: () => undefined,
  loginHandler: () => undefined,
}

type AuthContextProps = {
  children: ReactNode
}

const AuthContext = createContext(defaultValueContext)

const AuthProvider = ({ children }: AuthContextProps) => {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const { 'conduit.token': accessToken } = parseCookies()
    if (accessToken) setStatus('loggedIn')
  }, [])

  const loginHandler = (
    response: Either<DefaultError, SignInResponseOutput>
  ) => {
    if (isRight(response)) {
      const { token } = response.right.user
      setCoookies(token)
      setStatus('loggedIn')
    }
  }

  const signOut = () => {
    destroyCookies()
    setStatus('loggedOut')
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        loginHandler,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
