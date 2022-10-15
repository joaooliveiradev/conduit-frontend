import { useSignIn, UseSignInInput } from '@hooks/mutations/useSignIn'
import { destroyCookies } from '@utils/cookies'
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'
// import { resolveErrors } from '@utils/resolveErrors'
import { parseCookies } from 'nookies'

type Status = 'loggedOut' | 'loggedIn' | 'idle'

type ContextProps = {
  status: Status
  signIn: (values: UseSignInInput) => void
  isLoading: boolean
  isError: boolean
  errorSignIn: string
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
  errorSignIn: '',
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
    status: signInStatus,
    isLoading,
    isError,
    error
  } = useSignIn()
  console.log(signInStatus)
  console.log(error)
// {
//     onSuccess: (response) => {
//       const { token, username } = response.user
//       setCoookies(token)
//       setStatus('loggedIn')
//       localStorage.setItem('username', username)
//     },
//   }

  const signOut = () => {
    localStorage.removeItem('username')
    destroyCookies()
    setStatus('loggedOut')
  }

  // const errorSignIn = resolveErrors(errorSignInMutation)
  const errorSignIn = ''

  return (
    <AuthContext.Provider
      value={{
        status,
        signIn,
        isLoading,
        isError,
        errorSignIn,
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
