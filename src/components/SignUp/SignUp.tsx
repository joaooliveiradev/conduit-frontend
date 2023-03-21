import { Button, ErrorMessage, Input } from '@/components'
import { f } from '@/libs'
import { useFormik } from 'formik'
import { pipe } from 'fp-ts/function'
import { chain, fromNullable, getLeft, isSome, none } from 'fp-ts/Option'
import { useSignUp } from './useSignUp'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'

const Wrapper = styled.form`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.medium};
    padding: ${theme.spacings.xxsmall};
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxlarge};
  `}
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    text-align: center;
    color: ${theme.colors.grey[200]};
  `}
`

const ChangeFormBtn = styled.button`
  ${({ theme }) => css`
    background-color: unset;
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.black[100]};
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.black[100]};
    font-weight: 600;
  `}
`

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
  const { data, mutate: signUp, isLoading, error: errorSignUp } = useSignUp()

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
        <ErrorMessage
          message={maybeError.value.message}
          fontWeight="medium"
          textAlign="center"
        />
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
