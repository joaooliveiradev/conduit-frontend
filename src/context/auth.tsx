import { useMutation } from '@tanstack/react-query'
import { destroyCookies, setCoookies } from '@utils/cookies'
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
import { signInMutation, type SignInResponseOutput } from './signInMutation'
import { DefaultError } from '@utils/errors'
import { Option, none, some } from 'fp-ts/Option'

type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signIn: (values: SignInInput) => void
  isLoading: boolean
  isError: boolean
  errorMsg: Option<string>
  signOut: () => void
}

type AuthContextProps = {
  children: ReactNode
}

const defaultValueContext: ContextProps = {
  status: 'idle',
  signOut: () => undefined,
  signIn: () => undefined,
  isLoading: false,
  isError: false,
  errorMsg: none,
}

const AuthContext = createContext(defaultValueContext)

const AuthProvider = ({ children }: AuthContextProps) => {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<Option<string>>(none)

  useEffect(() => {
    const { 'conduit.token': accessToken } = parseCookies()
    if (accessToken) return setStatus('loggedIn')
  }, [])

  const {
    mutate: signIn,
    isLoading,
    isError,
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
      } else {
        setErrorMsg(some(response.left.message))
      }
    },
    onError: (error) => {
      setErrorMsg(some(error.message))
    },
  })

  const signOut = () => {
    destroyCookies()
    setStatus('loggedOut')
    setErrorMsg(none)
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        signIn,
        isLoading,
        isError,
        errorMsg,
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
