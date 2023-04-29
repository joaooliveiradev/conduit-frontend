import {
  TextArea,
  Tabs as TabsDefault,
  TabsPane as TabsPaneDefault,
  TabContent as TabContentDefault,
  Pane as PaneDefault,
  type TextAreaProps,
  FullScreenIcon,
  type ArticleBodyProps,
} from '@/components/'
import React, { useId, useState } from 'react'
import { FocusScope } from '@radix-ui/react-focus-scope'
import styled, { css } from 'styled-components'
import dynamic from 'next/dynamic'
import { transparentize } from 'polished'
import * as RadixPortal from '@radix-ui/react-portal'

const DefaultArticleBody = dynamic<ArticleBodyProps>(
  () =>
    import('@/components/ArticleBody/ArticleBody').then(
      (module) => module.ArticleBody
    ),
  {
    ssr: false,
  }
)

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

const FirstTabsPane = styled(TabsPane)`
  &:focus-visible:first-child {
    border-top-left-radius: 8px;
  }
`

const FullScreenButton = styled(TabsPane)`
  display: flex;
  margin-left: auto;
`

const TabContent = styled(TabContentDefault)`
  &:focus-visible {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`

const ArticleBody = styled(DefaultArticleBody)`
  ${({ theme }) => css`
    padding: ${theme.spacings.xsmall} ${theme.spacings.xxsmall};
    overflow-wrap: anywhere;
  `}
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

const FullScreenWrapper = styled.div`
  background: #ffffff;
  position: fixed;
  inset: 0;
  margin: ${({ theme }) => theme.spacings.xxlarge};
  transition: all 150ms ease;
  border-radius: ${({ theme }) => theme.spacings.small};
  box-shadow: 0 0 0 1px
    ${({ theme }) => transparentize(0.88, theme.colors.black[200])};
  ${Tabs}, ${TabContent} {
    height: 100%;
  }
`

type FullScreenProps = {
  children: React.ReactNode
}

const FullScreen = ({ children }: FullScreenProps) => (
  <RadixPortal.Root>
    <FocusScope loop trapped>
      <FullScreenWrapper>{children}</FullScreenWrapper>
    </FocusScope>
  </RadixPortal.Root>
)

type TextEditorProps = {
  defaultValue: string
} & TextAreaProps

export const TextEditor = ({ defaultValue, ...rest }: TextEditorProps) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<string>('write')

  const switchToFullScreen = () => setIsFullScreen((prevState) => !prevState)

  const id = useId()
  const textEditorId = `text-editor-${id}`

  return isFullScreen ? (
    <FullScreen>
      <Tabs
        id={textEditorId}
        defaultValue={tabValue}
        value={tabValue}
        onValueChange={setTabValue}
      >
        <Pane aria-label="Manage text editor menu items.">
          <FirstTabsPane value="write">Write</FirstTabsPane>
          <TabsPane value="preview">Preview</TabsPane>
          <FullScreenButton
            value="fullscreen"
            aria-controls={textEditorId}
            aria-expanded={isFullScreen}
            disabled
          >
            <FullScreenIcon onClick={switchToFullScreen} />
          </FullScreenButton>
        </Pane>
        <TabContent value="write" asChild>
          <TextArea defaultValue={defaultValue} {...rest} />
        </TabContent>
        <TabContent value="preview">
          <Preview textAreaValue={defaultValue} />
        </TabContent>
      </Tabs>
    </FullScreen>
  ) : (
    <Tabs
      id={textEditorId}
      defaultValue={tabValue}
      value={tabValue}
      onValueChange={setTabValue}
    >
      <Pane aria-label="Manage text editor menu items.">
        <TabsPane value="write">Write</TabsPane>
        <TabsPane value="preview">Preview</TabsPane>
        <FullScreenButton
          value="fullscreen"
          aria-controls={textEditorId}
          aria-expanded={isFullScreen}
          disabled
        >
          <FullScreenIcon onClick={switchToFullScreen} />
        </FullScreenButton>
      </Pane>
      <TabContent value="write" asChild>
        <TextArea defaultValue={defaultValue} {...rest} />
      </TabContent>
      <TabContent value="preview">
        <Preview textAreaValue={defaultValue} />
      </TabContent>
    </Tabs>
  )
}
