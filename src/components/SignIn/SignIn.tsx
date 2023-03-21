import { Button, ErrorMessage, Input } from '@/components'
import { useFormik } from 'formik'
import { isSome, none, chain, getLeft, fromNullable } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { f } from '@/libs'
import { type SignInRequest, useSignIn } from './useSignIn'
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

type SignInProps = {
  onSwitchFormClick: (state: boolean) => void
}

type SignInFieldValues = {
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

const initialValues: SignInFieldValues = {
  email: '',
  password: '',
}

const SignIn = ({ onSwitchFormClick }: SignInProps) => {
  const { mutate: signIn, data, error: errorSignIn, isLoading } = useSignIn()

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values: SignInFieldValues) => handleSubmit(values),
  })

  const handleSubmit = (values: SignInFieldValues) => {
    const newSignInValues: SignInRequest = {
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
        <ErrorMessage
          message={maybeError.value.message}
          fontWeight="medium"
          textAlign="center"
        />
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
