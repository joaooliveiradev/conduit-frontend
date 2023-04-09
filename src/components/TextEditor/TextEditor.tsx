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
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
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
    align-items: center;
  `}
`

const TabsPaneFullScreen = styled(TabsPane)`
  && {
    box-shadow: none;
    background: transparent;
    display: flex;
    margin-left: auto;
    &:focus-visible {
      outline: 1px solid transparent;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.black[200]};
    }
    &:hover {
      cursor: pointer;
    }
  }
`

const Preview = styled(ArticleBody)`
  ${({ theme }) => css`

    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    user-select: none;
    min-height: 230px;
  `}
`

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
            <TabsPaneFullScreen value="preview" onClick={switchFullScreen}>
              <AccessibleIcon.Root label="fullscreen">
                <FullScreenIcon />
              </AccessibleIcon.Root>
            </TabsPaneFullScreen>
          </Pane>
          <TabContent value="write">
            <TextArea onChange={writeText} value={text} />
          </TabContent>
          <TabContent value="preview">
            <Preview articleText={text} />
          </TabContent>
        </Tabs>
      </FocusScope>
    </Wrapper>
  )
}
