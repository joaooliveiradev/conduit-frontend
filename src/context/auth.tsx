import { DefaultError } from '@/libs'
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'
import { Either, isRight } from 'fp-ts/Either'
import { type SignInResponseOutput } from '@/components/Form/SignInModal/SignIn/signInMutation'
import { CookieSerializeOptions } from 'cookie'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const setCoookies = (accessToken: string) => {
  const oneHour = 60 * 60;
  const options: CookieSerializeOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: oneHour
  }
  setCookie(null, 'conduit.token', accessToken, options)
}

const destroyCookies = () => destroyCookie(null, 'conduit.token')

export type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signOut: () => void
  handleLogin: (response: Either<DefaultError, SignInResponseOutput>) => void
}

const defaultValueContext: ContextProps = {
  status: 'idle',
  signOut: () => undefined,
  handleLogin: () => undefined,
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
        handleLogin: loginHandler,
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
