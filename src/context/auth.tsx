import { useMutation } from '@tanstack/react-query'
import { destroyCookies, setCoookies, DefaultError } from '@/utils'
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'
import { parseCookies } from 'nookies'
import { SignInInput } from '@/types/user'
import { Either, isRight } from 'fp-ts/Either'
import { Option, none, fromNullable } from 'fp-ts/Option'
import { signInMutation, type SignInResponseOutput } from './signInMutation'
import { pipe } from 'fp-ts/lib/function'

type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signIn: (values: SignInInput) => void
  isLoading: boolean
  signOut: () => void
  data: Option<Either<DefaultError, SignInResponseOutput>>
  error: Option<DefaultError>
}

type AuthContextProps = {
  children: ReactNode
}

const defaultValueContext: ContextProps = {
  status: 'idle',
  signOut: () => undefined,
  signIn: () => undefined,
  isLoading: false,
  data: none,
  error: none,
}

const AuthContext = createContext(defaultValueContext)

const AuthProvider = ({ children }: AuthContextProps) => {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const { 'conduit.token': accessToken } = parseCookies()
    if (accessToken) return setStatus('loggedIn')
  }, [])

  const {
    mutate: signIn,
    isLoading,
    data: dataSignIn,
    error: errorSignIn,
  } = useMutation<
    Either<DefaultError, SignInResponseOutput>,
    DefaultError,
    SignInInput
  >(['sign-in'], signInMutation, {
    onSuccess: (response) => {
      if (isRight(response)) {
        const { token } = response.right.user
        setCoookies(token)
        setStatus('loggedIn')
      }
    },
  })

  const data = pipe(dataSignIn, fromNullable)
  const error = pipe(errorSignIn, fromNullable)

  const signOut = () => {
    destroyCookies()
    setStatus('loggedOut')
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        signIn,
        isLoading,
        signOut,
        data,
        error,
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
