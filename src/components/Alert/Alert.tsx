import { transparentize } from 'polished'
import { CheckIcon, ExclamationIcon, CloseIcon } from '@/components'
import { createContext, ReactNode, useContext, useState } from 'react'
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
    position: relative;
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

const ButtonWrapper = styled.button`
  ${({ theme }) => css`
    display: flex;
    background: transparent;
    position: absolute;
    top: ${theme.spacings.small};
    right: ${theme.spacings.small};
    cursor: pointer;
  `}
`

type DefaultContextProps = {
  status: Status
  onClose: () => void
}

const defaultContextValue: DefaultContextProps = {
  status: 'success',
  onClose: () => null,
}

const AlertContext = createContext(defaultContextValue)

export const Alert = ({ status, children }: AlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const onClose = () => setIsOpen(false)

  return (
    <AlertContext.Provider
      value={{
        status,
        onClose,
      }}
    >
      {isOpen && <Wrapper status={status}>{children}</Wrapper>}
    </AlertContext.Provider>
  )
}

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

const Close = () => {
  const { onClose } = useContext(AlertContext)
  return (
    <ButtonWrapper type="button" onClick={onClose}>
      <CloseIcon />
    </ButtonWrapper>
  )
}

Alert.Close = Close
