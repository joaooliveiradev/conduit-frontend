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
import { SignInInput } from 'types/user'
import { Either, isRight } from 'fp-ts/Either'
import { signInMutation, type SignInResponseOutput } from './signInMutation'
import { DefaultErrorType } from '@utils/errors'

type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signIn: (values: SignInInput) => void
  isLoading: boolean
  isError: boolean
  errorMsg: string
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
  errorMsg: '',
}

const AuthContext = createContext(defaultValueContext)

const AuthProvider = ({ children }: AuthContextProps) => {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    const { 'conduit.token': accessToken } = parseCookies()
    if (accessToken) return setStatus('loggedIn')
  }, [])

  const {
    mutate: signIn,
    isLoading,
    isError,
  } = useMutation<
    Either<DefaultErrorType, SignInResponseOutput>,
    DefaultErrorType,
    SignInInput
  >(['sign-in'], signInMutation, {
    onSuccess: (response) => {
      if (isRight(response)) {
        const { token, username } = response.right.user
        setCoookies(token)
        setStatus('loggedIn')
        localStorage.setItem('username', username)
      } else {
        setErrorMsg(response.left.message)
      }
    },
    onError: (error) => setErrorMsg(error.message),
  })

  const signOut = () => {
    localStorage.removeItem('username')
    destroyCookies()
    setStatus('loggedOut')
    setErrorMsg('')
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
