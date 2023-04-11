import { transparentize } from 'polished'
import { CheckIcon, ExclamationIcon } from '@/components'
import { createContext, ReactNode, useContext } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

type Status = 'success' | 'error'

type AlertStatus = {
  status: Status
}

export type AlertProps = {
  status: Status
  children: ReactNode
}

const getStatusColor = (status: Status, theme: DefaultTheme) =>
  status === 'error' ? theme.colors.red[100] : theme.colors.black[100]

const Wrapper = styled.div<AlertStatus>`
  ${({ theme, status }) => css`
    width: 100%;
    height: ${theme.spacings.xxlarge};
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    display: flex;
    align-items: center;
    padding-inline-start: ${theme.spacings.xxsmall};
    border-style: solid;
    border-radius: 4px;
    border-inline-start-width: ${theme.spacings.small};
    border-inline-start-color: ${getStatusColor(status, theme)};
  `}
`

const TextContent = styled.p<AlertStatus>`
  ${({ status, theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${getStatusColor(status, theme)};
  `}
`

const defaultContextValue: AlertStatus = {
  status: 'success',
}

const AlertContext = createContext(defaultContextValue)

export const Alert = ({ status, children }: AlertProps) => (
  <Wrapper status={status}>
    <AlertContext.Provider value={{ status }}>{children}</AlertContext.Provider>
  </Wrapper>
)

const Icon = () => {
  const { status } = useContext(AlertContext)
  return status === 'error' ? <ExclamationIcon /> : <CheckIcon />
}

Alert.Icon = Icon

type TextProps = {
  children: ReactNode
}

const Text = ({ children }: TextProps) => {
  const { status } = useContext(AlertContext)
  return <TextContent status={status}>{children}</TextContent>
}

Alert.Text = Text
