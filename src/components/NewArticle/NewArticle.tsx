import { Button, Input, TextArea } from '@/components'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useNewArticle } from './useNewArticle'
import styled, { css } from 'styled-components'

const Wrapper = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacings.xxmedium};
    width: 100%;
    max-width: 700px;
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.huge};
    color: ${theme.colors.black[400]};
  `}
`

const FieldWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacings.xxsmall};
  `}
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
  title: string().required().max(32, 'Maximum 32 characters required!'),
  description: string().required().max(64, 'Maximum 64 characters required!'),
  body: string().required(),
})

// colocar esse component em pixel perfect, seguir o figma
// ver se cabe fazer stories dos component que a gente desmembro
// story do hero

export const NewArticle = () => {
  const { mutate: createArticle } = useNewArticle()

  const handleSubmit = (values: NewArticleFieldValues) => {
    const newCreateArticleValues: NewArticleRequest = {
      article: values,
    }
    createArticle(newCreateArticleValues)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: newArticleSchema,
    onSubmit: (values) => handleSubmit(values),
  })

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
        <TextArea
          placeholder="Write your article (in markdown)"
          name="body"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.body}
          touched={formik.touched.body}
        />
      </FieldWrapper>
      <Button type="submit" size="large">
        Publish Article
      </Button>
    </Wrapper>
  )
}
