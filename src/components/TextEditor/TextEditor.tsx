import {
  TextArea,
  Tabs as TabsDefault,
  TabsPane,
  TabContent,
  Pane as PaneDefault,
  type TextAreaProps,
  FullScreenIcon,
} from '@/components/'
import { useState } from 'react'
import { ArticleBody as DefaultArticleBody } from '@/components/ArticleBody/ArticleBody'
import { FocusScope } from '@radix-ui/react-focus-scope'
import styled, { css, DefaultTheme } from 'styled-components'

type TextEditorWrapperProps = {
  fullScreen: boolean
}

const fullScreenModifiers = (theme: DefaultTheme) => css`
  background: #ffffff;
  position: fixed;
  inset: 0;
  margin: ${theme.spacings.xxlarge};
  transition: all 150ms ease;
`

const Wrapper = styled.div<TextEditorWrapperProps>(
  ({ fullScreen, theme }) => fullScreen && fullScreenModifiers(theme)
)

const Tabs = styled(TabsDefault)`
  gap: ${({ theme }) => theme.spacings.xsmall};
`

const Pane = styled(PaneDefault)`
  gap: ${({ theme }) => theme.spacings.xxsmall};
`

const FullScreenBtn = styled(TabsPane)`
  display: flex;
  margin-left: auto;
`

const ArticleBody = styled(DefaultArticleBody)`
  padding: ${({ theme }) => theme.spacings.xsmall};
`

const EmptyPreviewWrapper = styled.section`
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EmptyPreviewText = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    color: ${theme.colors.grey[100]};
  `}
`

type PreviewProps = {
  textAreaValue: string
}

const Preview = ({ textAreaValue }: PreviewProps) => {
  return textAreaValue.length === 0 ? (
    <EmptyPreviewWrapper>
      <EmptyPreviewText>Nothing to preview.</EmptyPreviewText>
    </EmptyPreviewWrapper>
  ) : (
    <ArticleBody articleText={textAreaValue} />
  )
}

type TextEditorProps = {
  value: string
} & TextAreaProps

export const TextEditor = ({
  value: textAreaValue,
  onChange,
  name,
  onBlur,
  errorMessage,
  touched,
}: TextEditorProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  const switchToFullScreen = () => setFullScreen((prevState) => !prevState)

  return (
    <Wrapper fullScreen={fullScreen}>
      <FocusScope loop={fullScreen} trapped={fullScreen}>
        <Tabs defaultValue="write">
          <Pane aria-label="Manage text editor menu items.">
            <TabsPane value="write">Write</TabsPane>
            <TabsPane value="preview">Preview</TabsPane>
            <FullScreenBtn
              value="previewFullScreen"
              onClick={switchToFullScreen}
            >
              <FullScreenIcon />
            </FullScreenBtn>
          </Pane>
          <TabContent value="write" asChild>
            <TextArea
              name={name}
              value={textAreaValue}
              onChange={onChange}
              onBlur={onBlur}
              touched={touched}
              errorMessage={errorMessage}
            />
          </TabContent>
          <TabContent value="preview">
            <Preview textAreaValue={textAreaValue} />
          </TabContent>
          <TabContent value="previewFullScreen">
            <Preview textAreaValue={textAreaValue} />
          </TabContent>
        </Tabs>
      </FocusScope>
    </Wrapper>
  )
}
