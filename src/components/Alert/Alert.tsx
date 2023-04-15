import { transparentize } from 'polished'
import { CheckIcon, ExclamationIcon, CloseIcon } from '@/components'
import { createContext, ReactNode, useContext, useId } from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import styled, { css, DefaultTheme } from 'styled-components'

type Status = 'success' | 'error'

type AlertStatus = {
  status: Status
}

export type AlertProps = {
  status: Status
  children: ReactNode
  open?: boolean
  onOpenChange?: (state: boolean) => void
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
  open: boolean
  id: string
}

const defaultContextValue: DefaultContextProps = {
  status: 'success',
  onClose: () => null,
  open: false,
  id: 'alert',
}

const AlertContext = createContext(defaultContextValue)

const defaultOpenValue = true

export const Alert = ({ status, children, open, onOpenChange }: AlertProps) => {
  const id = useId()
  const [isOpen = defaultOpenValue, setIsOpen] = useControllableState<boolean>({
    prop: open,
    onChange: onOpenChange,
  })

  const onClose = () => setIsOpen(!isOpen)

  if (isOpen) {
    return (
      <Wrapper role="alert" id={`alert-${id}`} status={status}>
        <AlertContext.Provider
          value={{
            status,
            onClose,
            open: isOpen,
            id: `alert-${id}`,
          }}
        >
          {children}
        </AlertContext.Provider>
      </Wrapper>
    )
  } else return null
}

const Icon = () => {
  const { status } = useContext(AlertContext)
  return status === 'error' ? <ExclamationIcon /> : <CheckIcon />
}

Alert.Icon = Icon

export type TextProps = {
  children: ReactNode
}

const Text = ({ children }: TextProps) => {
  const { status } = useContext(AlertContext)
  return <TextContent status={status}>{children}</TextContent>
}

Alert.Text = Text

const Close = () => {
  const { onClose, open, id } = useContext(AlertContext)

  return (
    <ButtonWrapper
      type="button"
      onClick={onClose}
      aria-controls={id}
      aria-expanded={open}
    >
      <CloseIcon />
    </ButtonWrapper>
  )
}

Alert.Close = Close
