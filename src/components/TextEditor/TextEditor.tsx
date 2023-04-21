import {
  TextArea,
  Tabs as TabsDefault,
  TabsPane as TabsPaneDefault,
  TabContent,
  Pane as PaneDefault,
  type TextAreaProps,
  FullScreenIcon,
  type ArticleBodyProps,
} from '@/components/'
import { useId, useState } from 'react'
import { FocusScope } from '@radix-ui/react-focus-scope'
import styled, { DefaultTheme, css } from 'styled-components'
import dynamic from 'next/dynamic'

type TextEditorWrapperProps = {
  fullScreen: boolean
}

const DefaultArticleBody = dynamic<ArticleBodyProps>(
  () =>
    import('@/components/ArticleBody/ArticleBody').then(
      (module) => module.ArticleBody
    ),
  {
    ssr: false,
  }
)

const fullScreenModifiers = (theme: DefaultTheme) => css`
  background: #ffffff;
  position: fixed;
  z-index: 999;
  inset: 0;
  margin: ${theme.spacings.xxlarge};
  transition: all 150ms ease;
  border-radius: ${theme.spacings.small};
  ${Tabs}, ${TabContent} {
    height: 100%;
  }
`

const Wrapper = styled.div<TextEditorWrapperProps>`
  ${({ fullScreen, theme }) => fullScreen && fullScreenModifiers(theme)}
`

const Tabs = styled(TabsDefault)`
  gap: 0px;
`

const Pane = styled(PaneDefault)`
  gap: ${({ theme }) => theme.spacings.xxsmall};
`

const TabsPane = styled(TabsPaneDefault)`
  &[data-state='active']:not(:focus-visible) {
    box-shadow: none;
  }
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
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  color: ${({ theme }) => theme.colors.grey[100]};
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
  errorMessage,
  placeholder,
}: TextEditorProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const id = useId()
  const switchToFullScreen = () => setFullScreen((prevState) => !prevState)

  const textEditorId = `text-editor-${id}`
  return (
    <FocusScope loop={fullScreen} trapped={fullScreen}>
      <Wrapper id={textEditorId} fullScreen={fullScreen}>
        <Tabs defaultValue="write">
          <Pane aria-label="Manage text editor menu items.">
            <TabsPane value="write">Write</TabsPane>
            <TabsPane value="preview">Preview</TabsPane>
            <FullScreenBtn
              value="previewFullScreen"
              onClick={switchToFullScreen}
              aria-expanded={fullScreen}
              aria-controls={textEditorId}
            >
              <FullScreenIcon />
            </FullScreenBtn>
          </Pane>
          <TabContent value="write" asChild>
            <TextArea
              name={name}
              value={textAreaValue}
              onChange={onChange}
              errorMessage={errorMessage}
              placeholder={placeholder}
            />
          </TabContent>
          <TabContent value="preview">
            <Preview textAreaValue={textAreaValue} />
          </TabContent>
          <TabContent value="previewFullScreen">
            <Preview textAreaValue={textAreaValue} />
          </TabContent>
        </Tabs>
      </Wrapper>
    </FocusScope>
  )
}
