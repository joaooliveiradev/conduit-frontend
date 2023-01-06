import { Button, ErrorMessage, Input } from '@/components'
import { useFormik } from 'formik'
import { useAuth } from '@/context'
import {
  Title,
  Text,
  ChangeFormBtn,
  Wrapper,
} from '@/components/Form/SignInModal/styles'
import { isSome, none, chain, getLeft, fromNullable } from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { f } from '@/libs/expression'
import { useMutation } from '@tanstack/react-query'
import { Either } from 'fp-ts/lib/Either'
import { DefaultError } from '@/libs/errors'
import { SignInInput } from '@/types/user'
import { signInMutation, type SignInResponseOutput } from './signInMutation'
import * as Yup from 'yup'

type SignInProps = {
  onSwitchFormClick: (state: boolean) => void
}

type SignInValues = {
  email: string
  password: string
}

const signInSchema = Yup.object({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('Email field is required')
    .lowercase(),
  password: Yup.string()
    .required('Password field is required')
    .min(8, 'Minimum 8 characters required!')
    .max(64, 'Maximum 64 characters required!'),
})

const initialValues: SignInValues = {
  email: '',
  password: '',
}

const SignIn = ({ onSwitchFormClick }: SignInProps) => {
  const { handleLogin } = useAuth()

  const {
    mutate: signIn,
    isLoading,
    data,
    error: errorSignIn,
  } = useMutation<
    Either<DefaultError, SignInResponseOutput>,
    DefaultError,
    SignInInput
  >(['sign-in'], signInMutation, {
    onSuccess: (response) => handleLogin(response),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values: SignInValues) => handleSubmit(values),
  })

  const handleSubmit = (values: SignInValues) => {
    const newSignInValues = {
      user: values,
    }
    signIn(newSignInValues)
  }

  const dataError = pipe(data, fromNullable, chain(getLeft))
  const error = fromNullable(errorSignIn)

  const maybeError = f(() => {
    if (isSome(error)) return error
    else if (isSome(dataError)) return dataError
    else return none
  })

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>Sign in</Title>
      <Input
        type="text"
        placeholder="Email"
        name="email"
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        touched={formik.touched.email}
        onBlur={formik.handleBlur}
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        onChange={formik.handleChange}
        errorMessage={formik.errors.password}
        touched={formik.touched.password}
        onBlur={formik.handleBlur}
      />
      <Button
        type="submit"
        size="large"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign in
      </Button>
      {isSome(maybeError) && (
        <ErrorMessage message={maybeError.value.message} fontWeight="medium" textAlign='center' />
      )}
      <Text>
        Don&apos;t have an account?{' '}
        <ChangeFormBtn type="button" onClick={() => onSwitchFormClick(false)}>
          Sign up
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}

export { SignIn }
