import {
  createContext,
  type ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'
import { type ValidationError } from '@/libs'
import { type Either, isRight } from 'fp-ts/Either'
import { type SignInResponseOutput } from '@/components/SignInModal/useSignIn'
import { CookieSerializeOptions } from 'cookie'
import { setCookie, destroyCookie, parseCookies } from 'nookies'

const useCookies = () => {
  const { 'conduit.token': accessToken } = parseCookies()

  const context = null
  const oneHour = 60 * 60

  const options: CookieSerializeOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: oneHour,
  }

  const destroyCookies = () => destroyCookie(context, 'conduit.token', options)

  const setCookies = (accessToken: string) =>
    setCookie(context, 'conduit.token', accessToken, options)

  return {
    accessToken,
    setCookies,
    destroyCookies,
  }
}

export type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signOut: () => void
  handleLogin: (response: Either<ValidationError, SignInResponseOutput>) => void
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

  const { setCookies, destroyCookies, accessToken } = useCookies()

  useEffect(() => {
    if (accessToken) setStatus('loggedIn')
  }, [accessToken])

  const loginHandler = (
    response: Either<ValidationError, SignInResponseOutput>
  ) => {
    if (isRight(response)) {
      const { token } = response.right.user
      setCookies(token)
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

export { AuthProvider, useAuth, useCookies }
