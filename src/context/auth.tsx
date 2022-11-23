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
import {
  signInMutation,
  type SignInResponseOutput,
} from '@/context/signInMutation'
import {
  signUpMutation,
  type SignUpResponseOutput,
} from '@/context/signUpMutation'
import { pipe } from 'fp-ts/lib/function'

type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signIn: (values: SignInInput) => void
  signOut: () => void
  signUp: (values: SignInInput) => void
  isLoadingSignIn: boolean
  isLoadingSignUp: boolean
  dataSignIn: Option<Either<DefaultError, SignInResponseOutput>>
  dataSignUp: Option<Either<DefaultError, SignUpResponseOutput>>
  errorSignIn: Option<DefaultError>
  errorSignUp: Option<DefaultError>
}

type AuthContextProps = {
  children: ReactNode
}

const defaultValueContext: ContextProps = {
  status: 'idle',
  signOut: () => undefined,
  signIn: () => undefined,
  signUp: () => undefined,
  isLoadingSignIn: false,
  isLoadingSignUp: false,
  dataSignIn: none,
  dataSignUp: none,
  errorSignIn: none,
  errorSignUp: none,
}

const AuthContext = createContext(defaultValueContext)

const AuthProvider = ({ children }: AuthContextProps) => {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const { 'conduit.token': accessToken } = parseCookies()
    if (accessToken) setStatus('loggedIn')
  }, [])

  const authSuccessHandler = (
    response: Either<DefaultError, SignInResponseOutput>
  ) => {
    if (isRight(response)) {
      const { token } = response.right.user
      setCoookies(token)
      setStatus('loggedIn')
    }
  }

  const {
    mutate: signIn,
    isLoading: isLoadingSignIn,
    data: dataSignInMutation,
    error: errorSignInMutation,
  } = useMutation<
    Either<DefaultError, SignInResponseOutput>,
    DefaultError,
    SignInInput
  >(['sign-in'], signInMutation, {
    onSuccess: (response) => authSuccessHandler(response),
  })

  const {
    data: dataSignUpMutation,
    mutate: signUp,
    isLoading: isLoadingSignUp,
    error: errorSignUpMutation,
  } = useMutation<
    Either<DefaultError, SignUpResponseOutput>,
    DefaultError,
    SignInInput
  >(['sign-up'], signUpMutation, {
    onSuccess: (response) => authSuccessHandler(response),
  })

  const dataSignIn = pipe(dataSignInMutation, fromNullable)
  const dataSignUp = pipe(dataSignUpMutation, fromNullable)
  const errorSignIn = pipe(errorSignInMutation, fromNullable)
  const errorSignUp = pipe(errorSignUpMutation, fromNullable)

  const signOut = () => {
    destroyCookies()
    setStatus('loggedOut')
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        isLoadingSignIn,
        isLoadingSignUp,
        signIn,
        signUp,
        signOut,
        dataSignIn,
        dataSignUp,
        errorSignIn,
        errorSignUp,
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
