import { type SignInRequest, useSignIn } from './useSignIn'
import { useSignUp, type SignUpRequest } from './useSignUp'
import { chain, fromNullable, getLeft, isSome } from 'fp-ts/Option'
import { Modal, Input, Button, ErrorFieldMessage } from '@/components'
import { useFormik } from 'formik'
import { pipe } from 'fp-ts/function'
import { type UnknownError, type ValidationError, f } from '@/libs'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { alt, type Option } from 'fp-ts/Option'
import * as Yup from 'yup'

const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.medium};
  padding: ${({ theme }) => theme.spacings.xxsmall};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  text-align: center;
  color: ${({ theme }) => theme.colors.grey[200]};
`

const ChangeFormBtn = styled.button`
  ${({ theme }) => css`
    background-color: unset;
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.black[100]};
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.black[100]};
    font-weight: 600;
    &:focus-visible {
      border: none;
    }
  `}
`

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

type SignInFieldValues = {
  email: string
  password: string
}

const initialSignInValues: SignInFieldValues = {
  email: '',
  password: '',
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

type SignUpFieldValues = {
  username: string
  email: string
  password: string
}

const initialSignUpValues: SignUpFieldValues = {
  username: '',
  email: '',
  password: '',
}

export type SignInModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  showSignInFirst: boolean
}

const signInRef = (node: HTMLInputElement | null) =>
  node ? node.focus() : null
const signUpRef = (node: HTMLInputElement | null) =>
  node ? node.focus() : null

export const SignInModal = ({
  open,
  onOpenChange,
  showSignInFirst = true,
}: SignInModalProps) => {
  const [showSignIn, setShowSignIn] = useState<boolean>(showSignInFirst)

  const {
    mutate: signIn,
    data: signInData,
    error: signInError,
    isLoading: signInLoading,
  } = useSignIn()

  const {
    mutate: signUp,
    data: signUpData,
    error: signUpError,
    isLoading: signUpLoading,
  } = useSignUp()

  const signInFormik = useFormik({
    initialValues: initialSignInValues,
    validationSchema: signInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: SignInFieldValues) => {
      const newSignInValues: SignInRequest = {
        user: values,
      }
      signIn(newSignInValues)
    },
  })

  const maybeSignInError = f(() => {
    const errorLeft = pipe(signInData, fromNullable, chain(getLeft))
    const genericError = fromNullable(signInError)
    return alt(() => errorLeft)(genericError)
  })

  const signUpFormik = useFormik({
    initialValues: initialSignUpValues,
    validationSchema: signUpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: SignUpFieldValues) => {
      const newSignUpValues: SignUpRequest = {
        user: values,
      }
      signUp(newSignUpValues)
    },
  })

  const maybeSignUpError: Option<ValidationError | UnknownError> = f(() => {
    const errorLeft = pipe(signUpData, fromNullable, chain(getLeft))
    const genericError = fromNullable(signUpError)
    return alt(() => errorLeft)(genericError)
  })

  const switchForm = () => {
    signInFormik.resetForm()
    signUpFormik.resetForm()
    setShowSignIn(!showSignIn)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {showSignIn ? (
        <Wrapper onSubmit={signInFormik.handleSubmit}>
          <Title>Sign in</Title>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            aria-label="Email"
            inputRef={signInRef}
            value={signInFormik.values.email}
            errorMessage={signInFormik.errors.email}
            onChange={signInFormik.handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            aria-label="Password"
            value={signInFormik.values.password}
            errorMessage={signInFormik.errors.password}
            onChange={signInFormik.handleChange}
          />
          <Button
            type="submit"
            size="large"
            isLoading={signInLoading}
            disabled={signInLoading}
          >
            Sign in
          </Button>
          {isSome(maybeSignInError) && (
            <ErrorFieldMessage
              message={maybeSignInError.value.message}
              fontWeight="medium"
              textAlign="center"
            />
          )}
          <Text>
            Don&apos;t have an account?{' '}
            <ChangeFormBtn type="button" onClick={switchForm}>
              Sign up
            </ChangeFormBtn>{' '}
            now.
          </Text>
        </Wrapper>
      ) : (
        <Wrapper onSubmit={signUpFormik.handleSubmit}>
          <Title>Sign up</Title>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            inputRef={signUpRef}
            value={signUpFormik.values.username}
            errorMessage={signUpFormik.errors.username}
            onChange={signUpFormik.handleChange}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            aria-label="Email"
            value={signUpFormik.values.email}
            errorMessage={signUpFormik.errors.email}
            onChange={signUpFormik.handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            aria-label="Password"
            value={signUpFormik.values.password}
            errorMessage={signUpFormik.errors.password}
            onChange={signUpFormik.handleChange}
          />
          <Button
            type="submit"
            size="large"
            disabled={signUpLoading}
            isLoading={signUpLoading}
          >
            Sign up
          </Button>
          {isSome(maybeSignUpError) && (
            <ErrorFieldMessage
              message={maybeSignUpError.value.message}
              fontWeight="medium"
              textAlign="center"
            />
          )}
          <Text>
            Already have an account?{' '}
            <ChangeFormBtn type="button" onClick={switchForm}>
              Sign in
            </ChangeFormBtn>{' '}
            now.
          </Text>
        </Wrapper>
      )}
    </Modal>
  )
}
