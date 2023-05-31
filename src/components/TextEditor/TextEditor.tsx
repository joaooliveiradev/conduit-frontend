import {
  type TextAreaProps,
  type ArticleBodyProps,
  TextArea,
} from '@/components/'
import {
  Tabs as TabsDefault,
  TabsPane as TabsPaneDefault,
  TabContent as TabContentDefault,
  Pane as PaneDefault,
} from '@/components/Tabs/Tabs'
import {
  FullScreenIcon as DefaultFullScreenIcon,
  ExitFullScreenIcon as DefaultExitFullScreenIcon,
} from '@/assets'
import { useId, useState, type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { type PortalProps } from '@radix-ui/react-portal'
import { type FocusScopeProps } from '@radix-ui/react-popover'
import dynamic from 'next/dynamic'

const DefaultArticleBody = dynamic<ArticleBodyProps>(
  () =>
    import('@/components/ArticleBody/ArticleBody').then(
      (module) => module.ArticleBody
    ),
  {
    ssr: false,
  }
)

const Portal = dynamic<PortalProps>(
  () => import('@radix-ui/react-portal').then((module) => module.Portal),
  {
    ssr: false,
  }
)

const FocusScope = dynamic<FocusScopeProps>(
  () =>
    import('@radix-ui/react-focus-scope').then((module) => module.FocusScope),
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

const FullScreenTabsPane = styled(TabsPane)`
  display: flex;
  margin-left: auto;
  padding: 0;
`

const FullScreenIcon = styled(DefaultFullScreenIcon)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacings.xsmall};
`

const ExitFullScreenIcon = styled(DefaultExitFullScreenIcon)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacings.xsmall};
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
  children: ReactNode
}

const FullScreen = ({ children }: FullScreenProps) => (
  <Portal>
    <FocusScope loop trapped>
      <FullScreenWrapper>{children}</FullScreenWrapper>
    </FocusScope>
  </Portal>
)

export interface TextEditorProps extends TextAreaProps {
  defaultValue: string
}

export const TextEditor = ({ defaultValue, ...rest }: TextEditorProps) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<string>('write')

  const switchToFullScreen = () => setIsFullScreen((prevState) => !prevState)

  const id = useId()
  const textEditorId = `text-editor-${id}`

  return isFullScreen ? (
    <FullScreen>
      <TabsDefault
        id={textEditorId}
        defaultValue={tabValue}
        value={tabValue}
        onValueChange={setTabValue}
      >
        <Pane aria-label="Manage text editor menu items.">
          <FirstTabsPane value="write">Write</FirstTabsPane>
          <TabsPane value="preview">Preview</TabsPane>
          <FullScreenTabsPane
            value="fullscreen"
            aria-controls={textEditorId}
            aria-expanded={isFullScreen}
            disabled
          >
            <ExitFullScreenIcon onClick={switchToFullScreen} />
          </FullScreenTabsPane>
        </Pane>
        <TabContent value="write" asChild>
          <TextArea defaultValue={defaultValue} {...rest} />
        </TabContent>
        <TabContent value="preview">
          <Preview textAreaValue={defaultValue} />
        </TabContent>
      </TabsDefault>
    </FullScreen>
  ) : (
    <TabsDefault
      id={textEditorId}
      defaultValue={tabValue}
      value={tabValue}
      onValueChange={setTabValue}
    >
      <Pane aria-label="Manage text editor menu items.">
        <TabsPane value="write">Write</TabsPane>
        <TabsPane value="preview">Preview</TabsPane>
        <FullScreenTabsPane
          value="fullscreen"
          aria-controls={textEditorId}
          aria-expanded={isFullScreen}
          disabled
        >
          <FullScreenIcon onClick={switchToFullScreen} />
        </FullScreenTabsPane>
      </Pane>
      <TabContent value="write" asChild>
        <TextArea defaultValue={defaultValue} {...rest} />
      </TabContent>
      <TabContent value="preview">
        <Preview textAreaValue={defaultValue} />
      </TabContent>
    </TabsDefault>
  )
}
