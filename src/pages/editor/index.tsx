import {
  type Option,
  fromNullable,
  chain,
  isSome,
  getLeft,
  alt,
  getRight,
} from 'fp-ts/Option'
import {
  type AlertProps,
  type TextProps,
  Button,
  TextButton,
  TextEditor,
  Input,
} from '@/components'
import {
  type AuthorizationError,
  type UnknownError,
  type ValidationError,
  f,
} from '@/libs'
import {
  parse as superJsonParse,
  stringify as superJsonStringify,
} from 'superjson'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useNewArticle } from '@/hooks'
import { NewArticleCodec } from '@/types'
import { isRight } from 'fp-ts/Either'
import type { GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { defaultSEO } from '@/pages/_app'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
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

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Form = styled.form`
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

const newArticleSchema = object({
  title: string()
    .required('Title is a required field and cannot be empty')
    .max(32, 'Maximum 32 characters required!'),
  description: string()
    .required('Description is a required field and cannot be empty')
    .max(64, 'Maximum 64 characters required!'),
  body: string().required('Body is a required field and cannot be empty!'),
})

type NewArticleFieldValues = {
  title: string
  description: string
  body: string
}

export type NewArticleRequest = {
  article: NewArticleFieldValues
}

const initialFieldValues: NewArticleFieldValues = {
  title: '',
  description: '',
  body: '',
}

const isLocalStorageAvailable = () => {
  try {
    if (!localStorage) return false
    localStorage.setItem('localStorageTest', 'localStorageTest')
    localStorage.removeItem('localStorageTest')
    return true
  } catch (e: unknown) {
    return false
  }
}

const storageKey = 'new-article-editor'

const defaultQuotaExceeded = 'QuotaExceededError'

const firefoxQuotaExceeded = 'NS_ERROR_DOM_QUOTA_REACHED'

const isQuotaExceededError = (err: unknown, storage: Storage) =>
  err instanceof DOMException &&
  (err.name === defaultQuotaExceeded || err.name === firefoxQuotaExceeded) &&
  storage &&
  storage.length !== 0

const setStorageData = (storageData: NewArticleFieldValues) => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(storageKey, superJsonStringify(storageData))
    } else throw new Error('localStorage is not available')
  } catch (e: unknown) {
    if (isQuotaExceededError(e, localStorage)) {
      localStorage.clear()
    }
  }
}

const getStorageData = () => {
  try {
    const maybeCachedData = fromNullable(localStorage.getItem(storageKey))

    const cachedData =
      isSome(maybeCachedData) && superJsonParse(maybeCachedData.value)

    const cacheDecodedData = NewArticleCodec.decode(cachedData)

    const storageData = isRight(cacheDecodedData)
      ? cacheDecodedData.right
      : initialFieldValues

    return storageData
  } catch (e: unknown) {
    return initialFieldValues
  }
}

const useLocalStorage = () => {
  const [storage, setStorage] = useState<NewArticleFieldValues>(getStorageData)

  useEffect(() => setStorageData(storage), [storage])

  return { storage, setStorage }
}

const firstInputRef = (node: HTMLInputElement | null) =>
  node ? node.focus() : null

const Editor = () => {
  const { status } = useAuth()
  const router = useRouter()
  const { mutate: createArticle, data, error, isLoading } = useNewArticle()
  const { storage, setStorage } = useLocalStorage()

  useEffect(() => {
    if (!(status === 'loggedIn')) router.replace('/unauthorized')
  }, [status, router])

  const handleSubmit = (values: NewArticleFieldValues) => {
    const newCreateArticleValues: NewArticleRequest = {
      article: values,
    }

    return createArticle(newCreateArticleValues)
  }

  const formik = useFormik<NewArticleFieldValues>({
    initialValues: storage,
    validationSchema: newArticleSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => handleSubmit(values),
  })

  useEffect(() => setStorage(formik.values), [formik.values, setStorage])

  const dataOption = fromNullable(data)

  const maybeData = chain(getRight)(dataOption)

  const maybeError: Option<
    ValidationError | UnknownError | AuthorizationError
  > = f(() => {
    const genericErrorOption = fromNullable(error)
    const errorLeftOption = chain(getLeft)(dataOption)
    return alt(() => errorLeftOption)(genericErrorOption)
  })

  const isCreateArticleSuccessful = isSome(maybeData)

  const { resetForm } = formik

  useEffect(() => {
    if (isCreateArticleSuccessful) {
      return resetForm({ values: initialFieldValues })
    }
  }, [isCreateArticleSuccessful, resetForm])

  return (
    <>
      <NextSeo {...defaultSEO} title="Conduit - New Article" />
      <Wrapper>
        <Form onSubmit={formik.handleSubmit}>
          <Title>New Article</Title>
          <FieldWrapper>
            <Input
              inputRef={firstInputRef}
              type="text"
              placeholder="Title"
              name="title"
              aria-label="Title"
              onChange={formik.handleChange}
              errorMessage={formik.errors.title}
              value={formik.values.title}
            />
            <Input
              type="text"
              placeholder="What's this article about?"
              name="description"
              aria-label="Description"
              onChange={formik.handleChange}
              errorMessage={formik.errors.description}
              value={formik.values.description}
            />
            <TextEditor
              placeholder="Type something awesome!"
              name="body"
              aria-label="Body"
              onChange={formik.handleChange}
              errorMessage={formik.errors.body}
              value={formik.values.body}
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
        </Form>
      </Wrapper>
    </>
  )
}

const oneHour = 3600

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { 'conduit.token': accessToken } = parseCookies(ctx)

  ctx.res.setHeader(
    'Cache-Control',
    `private, max-age=${oneHour}, stale-while-revalidate=${oneHour}`
  )

  if (!accessToken) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Editor
