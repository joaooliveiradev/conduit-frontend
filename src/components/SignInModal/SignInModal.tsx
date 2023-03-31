import {
  chain,
  fromNullable,
  getLeft,
  isSome,
  type None,
  none,
  type Some,
} from 'fp-ts/Option'
import {
  type SignInRequest,
  useSignIn,
  SignInResponseOutput,
} from './useSignIn'
import {
  SignUpResponseOutput,
  useSignUp,
  type SignUpRequest,
} from './useSignUp'
import { Modal, Input, Button, ErrorMessage } from '@/components'
import { useFormik } from 'formik'
import { pipe } from 'fp-ts/function'
import { DefaultError } from '@/libs'
import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Either } from 'fp-ts/Either'
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
  data: Either<DefaultError, D> | undefined,
  genericError: DefaultError | null
) => None | Some<DefaultError>

export const SignInModal = ({
  open,
  onOpenChange,
  showSignInFirst = true,
}: SignInModalProps) => {
  const [showSignIn, setShowSignIn] = React.useState<boolean>(showSignInFirst)

  const signInFirstInputRef = useRef<HTMLInputElement>(null)
  const signUpFirstInputRef = useRef<HTMLInputElement>(null)

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
    onSubmit: (values: SignUpFieldValues) => {
      console.log({ values })
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

  useEffect(() => {
    if (showSignIn) {
      signInFirstInputRef.current ? signInFirstInputRef.current.focus() : null
    } else {
      signUpFirstInputRef.current ? signUpFirstInputRef.current.focus() : null
    }
  }, [showSignIn])

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {showSignIn ? (
        <Wrapper onSubmit={signInFormik.handleSubmit}>
          <Title>Sign in</Title>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            inputRef={signInFirstInputRef}
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
            <ErrorMessage
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
            inputRef={signUpFirstInputRef}
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
            <ErrorMessage
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
