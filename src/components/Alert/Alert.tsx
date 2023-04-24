import { transparentize } from 'polished'
import { CheckIcon, ExclamationIcon, CloseIcon } from '@/components'
import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useEffect,
} from 'react'
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
  duration?: number
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
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  color: ${({ status, theme }) => getStatusColor(status, theme)};
`

const ButtonWrapper = styled.button`
  display: flex;
  background: transparent;
  position: absolute;
  top: ${({ theme }) => theme.spacings.xsmall};
  right: ${({ theme }) => theme.spacings.xsmall};
  cursor: pointer;
`

type DefaultContextProps = {
  status: Status
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>
  open: boolean
  id: string
}

const defaultContextValue: DefaultContextProps = {
  status: 'success',
  setIsOpen: () => null,
  open: false,
  id: 'alert',
}

const AlertContext = createContext(defaultContextValue)

const defaultOpenValue = true
const defaultDurationValue = 5000

export const Alert = ({
  status,
  children,
  open = true,
  onOpenChange,
  duration = defaultDurationValue,
}: AlertProps) => {
  const id = useId()
  const [isOpen = defaultOpenValue, setIsOpen] = useControllableState<boolean>({
    prop: open,
    onChange: onOpenChange,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(!defaultOpenValue), duration)
    return () => window.clearTimeout(timer)
  }, [duration, isOpen, setIsOpen])

  if (isOpen) {
    return (
      <Wrapper role="alert" id={`alert-${id}`} status={status}>
        <AlertContext.Provider
          value={{
            status,
            setIsOpen,
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
  const { setIsOpen, open, id } = useContext(AlertContext)

  const handleClose = () => setIsOpen(!open)

  return (
    <ButtonWrapper
      type="button"
      onClick={handleClose}
      aria-controls={id}
      aria-expanded={open}
    >
      <CloseIcon width={16} height={16} />
    </ButtonWrapper>
  )
}

Alert.Close = Close
