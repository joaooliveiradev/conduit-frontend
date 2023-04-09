import {
  TextArea,
  Tabs as TabsDefault,
  TabsPane,
  TabContent,
  Pane as PaneDefault,
} from '@/components/'
import styled, { css } from 'styled-components'
import { ChangeEvent, useState } from 'react'
import { ReactComponent as FullScreenIcon } from '@/assets/fullscreen.svg'
import { ArticleBody } from '@/components/ArticleBody/ArticleBody'
import { FocusScope } from '@radix-ui/react-focus-scope'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type TextEditorWrapperProps = {
  fullScreen: boolean
}

const Wrapper = styled.div<TextEditorWrapperProps>`
  ${({ fullScreen, theme }) =>
    fullScreen &&
    css`
      background: #ffffff;
      position: fixed;
      inset: 0;
      margin: ${theme.spacings.xxlarge};
      transition: all 200ms ease;
    `}
`

const Tabs = styled(TabsDefault)`
  ${({ theme }) => css`
    gap: ${theme.spacings.xsmall};
  `}
`

const Pane = styled(PaneDefault)`
  ${({ theme }) => css`
    gap: ${theme.spacings.xxsmall};
    align-items: center;
  `}
`

const TabsPaneFullScreen = styled(TabsPane)`
  display: flex;
  margin-left: auto;
`

const Preview = styled(ArticleBody)`
  ${({ theme }) => css`
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
  `}
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

const EmptyPreview = () => {
  return (
    <EmptyPreviewWrapper>
      <EmptyPreviewText>Nothing to preview.</EmptyPreviewText>
    </EmptyPreviewWrapper>
  )
}

export const TextEditor = () => {
  const [text, setText] = useState<string>('')
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  const writeText = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value)

  const switchFullScreen = () =>
    setFullScreen((prevFullScreen) => !prevFullScreen)

  return (
    <Wrapper fullScreen={fullScreen}>
      <FocusScope loop={fullScreen} trapped={fullScreen}>
        <Tabs defaultValue="write">
          <Pane>
            <TabsPane value="write">Write</TabsPane>
            <TabsPane value="preview">Preview</TabsPane>
            <TabsPaneFullScreen
              value="previewFullScreen"
              onClick={switchFullScreen}
            >
              <AccessibleIcon.Root label="fullscreen">
                <FullScreenIcon />
              </AccessibleIcon.Root>
            </TabsPaneFullScreen>
          </Pane>
          <TabContent value="write">
            <TextArea onChange={writeText} value={text} />
          </TabContent>
          <TabContent value="preview">
            {text.length === 0 ? (
              <EmptyPreview />
            ) : (
              <Preview articleText={text} />
            )}
          </TabContent>
          <TabContent value="previewFullScreen">
            {text.length === 0 ? (
              <EmptyPreview />
            ) : (
              <Preview articleText={text} />
            )}
          </TabContent>
        </Tabs>
      </FocusScope>
    </Wrapper>
  )
}
