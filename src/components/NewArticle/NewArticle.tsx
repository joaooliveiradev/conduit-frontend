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
import { AuthorizationError, UnknownError, ValidationError } from '@/libs'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

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

export const NewArticle = () => {
  const { mutate: createArticle, data, error, isLoading } = useNewArticle()

  const handleSubmit = (values: NewArticleFieldValues) => {
    const newCreateArticleValues: NewArticleRequest = {
      article: values,
    }
    createArticle(newCreateArticleValues)
  }

  const formik = useFormik({
    initialValues,
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

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Title>New Article</Title>
      <FieldWrapper>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={formik.handleChange}
          errorMessage={formik.errors.title}
          touched={formik.touched.title}
          onBlur={formik.handleBlur}
        />
        <Input
          type="text"
          placeholder="What's this article about?"
          name="description"
          onChange={formik.handleChange}
          errorMessage={formik.errors.description}
          touched={formik.touched.description}
          onBlur={formik.handleBlur}
        />
        <TextEditor
          name="body"
          placeholder="Type something awesome!"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          errorMessage={formik.errors.body}
          touched={formik.touched.body}
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
