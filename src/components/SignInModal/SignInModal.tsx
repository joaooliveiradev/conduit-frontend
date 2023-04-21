import {
  type SignInRequest,
  useSignIn,
  type SignInResponseOutput,
} from './useSignIn'
import {
  type SignUpResponseOutput,
  useSignUp,
  type SignUpRequest,
} from './useSignUp'
import {
  chain,
  fromNullable,
  getLeft,
  isSome,
  type None,
  none,
  type Some,
} from 'fp-ts/Option'
import { Modal, Input, Button, ErrorFieldMessage } from '@/components'
import { useFormik } from 'formik'
import { pipe } from 'fp-ts/function'
import { ValidationError, UnknownError } from '@/libs'
import { useState } from 'react'
import type { Either } from 'fp-ts/Either'
import styled, { css } from 'styled-components'
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

type GetMaybeErrorProps = <D>(
  data: Either<ValidationError, D> | undefined,
  genericError: UnknownError | null
) => None | Some<ValidationError> | Some<UnknownError>

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

  const getMaybeError: GetMaybeErrorProps = (data, genericError) => {
    const dataError = pipe(data, fromNullable, chain(getLeft))
    const error = fromNullable(genericError)
    if (isSome(error)) return error
    else if (isSome(dataError)) return dataError
    else return none
  }

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

  const maybeSignInError = getMaybeError<SignInResponseOutput>(
    signInData,
    signInError
  )

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

  const maybeSignUpError = getMaybeError<SignUpResponseOutput>(
    signUpData,
    signUpError
  )

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
            inputRef={signInRef}
            value={signInFormik.values.email}
            errorMessage={signInFormik.errors.email}
            touched={signInFormik.touched.password}
            onBlur={signInFormik.handleBlur}
            onChange={signInFormik.handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={signInFormik.values.password}
            errorMessage={signInFormik.errors.password}
            touched={signInFormik.touched.password}
            onChange={signInFormik.handleChange}
            onBlur={signInFormik.handleBlur}
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
            inputRef={signUpRef}
            value={signUpFormik.values.username}
            errorMessage={signUpFormik.errors.username}
            touched={signUpFormik.touched.username}
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={signUpFormik.values.email}
            errorMessage={signUpFormik.errors.email}
            touched={signUpFormik.touched.email}
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={signUpFormik.values.password}
            errorMessage={signUpFormik.errors.password}
            touched={signUpFormik.touched.password}
            onChange={signUpFormik.handleChange}
            onBlur={signUpFormik.handleBlur}
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
