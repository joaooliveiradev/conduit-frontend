import Input from '@components/Input'
import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import { useFormik } from 'formik'
import { signInSchema } from '@schemas/Signin'
import { useAuth } from '@context/auth'
import {
  Wrapper,
  Title,
  Text,
  ChangeFormBtn,
} from '@components/Form/SignInModal/styles'

type SignInProps = {
  handleClick: (state: boolean) => void
}

export type SignInValues = {
  email: string
  password: string
}

const SignIn = ({ handleClick }: SignInProps) => {
  const { signIn, isLoading, errorMsg } = useAuth()

  const initialValues: SignInValues = {
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: (values: SignInValues) => handleSubmit(values),
  })

  const handleSubmit = (values: SignInValues) => {
    const newSignInValues = {
      user: {
        ...values,
      },
    }
    signIn(newSignInValues)
  }

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>Sign in</Title>
      <Input
        type="text"
        id="email"
        placeholder="Email"
        name="email"
        onChange={formik.handleChange}
        errorMessage={formik.errors.email}
        touched={formik.touched.email}
        onBlur={formik.handleBlur}
        autoFocus
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
        disabled={isLoading || !formik.isValid}
      >
        Sign in
      </Button>
      {errorMsg && <ErrorMessage errorMessage={errorMsg} />}
      <Text>
        Don&apos;t have an account?{' '}
        <ChangeFormBtn onClick={() => handleClick(false)}>
          Sign up
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}

export default SignIn
