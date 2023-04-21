import {
  fromNullable,
  chain,
  isSome,
  getLeft,
  alt,
  getRight,
  type Option,
} from 'fp-ts/Option'
import {
  type AlertProps,
  type TextProps,
  Button,
  Input,
  TextButton,
  TextEditor,
} from '@/components'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useNewArticle } from './useNewArticle'
import { pipe } from 'fp-ts/function'
import { AuthorizationError, UnknownError, ValidationError, f } from '@/libs'
import { useEffect } from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import * as superJSON from 'superjson'

const Alert = {
  Root: dynamic<AlertProps>(
    () => import('@/components/Alert/Alert').then((module) => module.Alert),
    {
      ssr: false,
    }
  ),
  Text: dynamic<TextProps>(
    () =>
      import('@/components/Alert/Alert').then((module) => module.Alert.Text),
    {
      ssr: false,
    }
  ),
  Icon: dynamic<unknown>(
    () =>
      import('@/components/Alert/Alert').then((module) => module.Alert.Icon),
    {
      ssr: false,
    }
  ),
  Close: dynamic<unknown>(
    () =>
      import('@/components/Alert/Alert').then((module) => module.Alert.Close),
    {
      ssr: false,
    }
  ),
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xmedium};
  width: 100%;
  max-width: 700px;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.huge};
  color: ${({ theme }) => theme.colors.black[400]};
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xxsmall};
`

const PublishBtn = styled(Button)`
  align-self: flex-end;
`

const AlertContentWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacings.xsmall};
`

type NewArticleFieldValues = {
  title: string
  description: string
  body: string
}

export type NewArticleRequest = {
  article: NewArticleFieldValues
}

const initialValues: NewArticleFieldValues = {
  title: '',
  description: '',
  body: '',
}

const newArticleSchema = object({
  title: string()
    .required('Title is a required field and cannot be empty')
    .max(32, 'Maximum 32 characters required!'),
  description: string()
    .required('Description is a required field and cannot be empty')
    .max(64, 'Maximum 64 characters required!'),
  body: string().required('Body is a required field and cannot be empty!'),
})

const storageKey = 'new-article-editor'

export const NewArticle = () => {
  const { mutate: createArticle, data, error, isLoading } = useNewArticle()

  const storagedValue: NewArticleFieldValues = f(() => {
    if (typeof window === 'undefined') return initialValues
    const cachedStorage = fromNullable(localStorage.getItem(storageKey))

    return isSome(cachedStorage)
      ? superJSON.parse(cachedStorage.value)
      : initialValues
  })

  const handleSubmit = (values: NewArticleFieldValues) => {
    const newCreateArticleValues: NewArticleRequest = {
      article: values,
    }
    createArticle(newCreateArticleValues)
  }

  const formik = useFormik({
    initialValues: storagedValue,
    validationSchema: newArticleSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => handleSubmit(values),
  })

  const dataOption = fromNullable(data)

  const genericErrorOption = fromNullable(error)
  const errorLeftOption = pipe(dataOption, chain(getLeft))

  const maybeError: Option<
    ValidationError | UnknownError | AuthorizationError
  > = alt(() => errorLeftOption)(genericErrorOption)
  const maybeData = pipe(dataOption, chain(getRight))

  useEffect(() => {
    const updatedFieldValues: NewArticleFieldValues = {
      title: formik.values.title,
      description: formik.values.description,
      body: formik.values.body,
    }
    localStorage.setItem(storageKey, superJSON.stringify(updatedFieldValues))
  }, [formik.values])

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>New Article</Title>
      <FieldWrapper>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={storagedValue.title}
          onChange={formik.handleChange}
          errorMessage={formik.errors.title}
        />
        <Input
          type="text"
          placeholder="What's this article about?"
          name="description"
          defaultValue={storagedValue.description}
          onChange={formik.handleChange}
          errorMessage={formik.errors.description}
        />
        <TextEditor
          name="body"
          placeholder="Type something awesome!"
          defaultValue={storagedValue.body}
          onChange={formik.handleChange}
          value={formik.values.body}
          errorMessage={formik.errors.body}
        />
      </FieldWrapper>
      <PublishBtn
        type="submit"
        size="large"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Publish Article
      </PublishBtn>
      {isSome(maybeData) && (
        <Alert.Root status="success">
          <AlertContentWrapper>
            <Alert.Icon />
            <Alert.Text>
              Congratulations! Your article has been successfully created.
            </Alert.Text>
            <TextButton
              target="_blank"
              href={`/article/${maybeData.value.article.slug}`}
            >
              View
            </TextButton>
            <Alert.Close />
          </AlertContentWrapper>
        </Alert.Root>
      )}
      {isSome(maybeError) && (
        <Alert.Root status="error">
          <AlertContentWrapper>
            <Alert.Icon />
            <Alert.Text>{maybeError.value.message}</Alert.Text>
            <Alert.Close />
          </AlertContentWrapper>
        </Alert.Root>
      )}
    </Wrapper>
  )
}
