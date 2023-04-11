import { ReactComponent as DefaultCloseIcon } from './close.svg'
import { ReactComponent as DefaultEmptyIcon } from './empty.svg'
import { ReactComponent as DefaultErrorStateIcon } from './error-state.svg'
import { ReactComponent as DefaultFullScreenIcon } from './fullscreen.svg'
import { ReactComponent as DefaultCheckIcon } from './check.svg'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

export const CloseIcon = () => (
  <AccessibleIcon.Root label="close">
    <DefaultCloseIcon />
  </AccessibleIcon.Root>
)

export const EmptyIcon = () => (
  <AccessibleIcon.Root label="empty state">
    <DefaultEmptyIcon />
  </AccessibleIcon.Root>
)

export const ErrorStateIcon = () => (
  <AccessibleIcon.Root label="error state">
    <DefaultErrorStateIcon />
  </AccessibleIcon.Root>
)

export const FullScreenIcon = () => (
  <AccessibleIcon.Root label="fullscreen">
    <DefaultFullScreenIcon />
  </AccessibleIcon.Root>
)

export const CheckIcon = () => (
  <AccessibleIcon.Root label="check">
    <DefaultCheckIcon />
  </AccessibleIcon.Root>
)
