import { Button, ErrorMessage, Input } from '@/components'
import {
  Wrapper,
  Title,
  Text,
  ChangeFormBtn,
} from '@/components/Form/SignInModal/styles'
import { useAuth } from '@/context/auth'
import { SignInInput } from '@/types/user'
import { DefaultError } from '@/libs/errors'
import { f } from '@/libs/expression'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Either } from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { chain, fromNullable, getLeft, isSome, none } from 'fp-ts/Option'
import { signUpMutation, type SignUpResponseOutput } from './signUpMutation'
import * as Yup from 'yup'

type SignUpProps = {
  onSwitchFormClick: (state: boolean) => void
}

type SignUpValues = {
  username: string
  email: string
  password: string
}

const signUpSchema = Yup.object({
  username: Yup.string().required('Username field is required').lowercase(),
  email: Yup.string()
    .email('E-mail is not valid')
    .required('Email field is required')
    .lowercase(),
  password: Yup.string()
    .required('Password field is required')
    .min(8, 'Minimum 8 characters required!')
    .max(64, 'Maximum 64 characters required!'),
})

const initialValues: SignUpValues = {
  username: '',
  email: '',
  password: '',
}

export const SignUp = ({ onSwitchFormClick }: SignUpProps) => {
  const { handleLogin } = useAuth()

  const {
    data,
    mutate: signUp,
    isLoading,
    error: errorSignUp,
  } = useMutation<
    Either<DefaultError, SignUpResponseOutput>,
    DefaultError,
    SignInInput
  >(['sign-up'], signUpMutation, {
    onSuccess: (response) => handleLogin(response),
  })

  const handleSubmit = (values: SignUpValues) => {
    const newSignUpValues = {
      user: values,
    }
    signUp(newSignUpValues)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => handleSubmit(values),
  })

  const dataError = pipe(data, fromNullable, chain(getLeft))
  const error = fromNullable(errorSignUp)

  const maybeError = f(() => {
    if (isSome(error)) return error
    else if (isSome(dataError)) return dataError
    else return none
  })

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>Sign up</Title>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        onChange={formik.handleChange}
        errorMessage={formik.errors.username}
        onBlur={formik.handleBlur}
        touched={formik.touched.username}
      />
      <Input
        type="text"
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        onBlur={formik.handleBlur}
        touched={formik.touched.email}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={formik.handleChange}
        errorMessage={formik.errors.password}
        onBlur={formik.handleBlur}
        touched={formik.touched.password}
      />
      <Button
        type="submit"
        size="large"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Sign up
      </Button>
      {isSome(maybeError) && (
        <ErrorMessage errorMessage={maybeError.value.message} />
      )}
      <Text>
        Already have an account?{' '}
        <ChangeFormBtn type="button" onClick={() => onSwitchFormClick(true)}>
          Sign in
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}
