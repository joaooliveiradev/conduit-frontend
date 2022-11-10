import { Input } from '@components/Input'
import { Button, ErrorMessage } from '@/components'
import { useFormik } from 'formik'
import { useAuth } from '@context/auth'
import {
  Title,
  Text,
  ChangeFormBtn,
  Wrapper,
} from '@components/Form/SignInModal/styles'
import * as Yup from 'yup'
import { isSome } from 'fp-ts/Option'

type SignInProps = {
  handleClick: (state: boolean) => void
}

export type SignInValues = {
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
      user: values,
    }
    signIn(newSignInValues)
  }

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
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        onChange={formik.handleChange}
        errorMessage={formik.errors.password}
        touched={formik.touched.password}
      />
      <Button
        type="submit"
        size="large"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign in
      </Button>
      {isSome(errorMsg) && <ErrorMessage errorMessage={errorMsg.value} />}
      <Text>
        Don&apos;t have an account?{' '}
        <ChangeFormBtn type="button" onClick={() => handleClick(false)}>
          Sign up
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}

export { SignIn }
