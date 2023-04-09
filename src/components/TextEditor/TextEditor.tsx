import {
  TextArea,
  Tabs as TabsDefault,
  TabsPane,
  TabContent,
  Pane as PaneDefault,
  TextAreaProps,
} from '@/components/'
import { FullScreenIcon } from '@/assets/'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import { ArticleBody } from '@/components/ArticleBody/ArticleBody'
import { FocusScope } from '@radix-ui/react-focus-scope'

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

type TextEditorProps = {
  value: string
} & TextAreaProps

export const TextEditor = ({ value, ...rest }: TextEditorProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  const switchToFullScreen = () =>
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
              onClick={switchToFullScreen}
            >
              <FullScreenIcon />
            </TabsPaneFullScreen>
          </Pane>
          <TabContent value="write">
            <TextArea {...rest} />
          </TabContent>
          <TabContent value="preview">
            {value.length === 0 ? (
              <EmptyPreview />
            ) : (
              <Preview articleText={value} />
            )}
          </TabContent>
          <TabContent value="previewFullScreen">
            {value.length === 0 ? (
              <EmptyPreview />
            ) : (
              <Preview articleText={value} />
            )}
          </TabContent>
        </Tabs>
      </FocusScope>
    </Wrapper>
  )
}
