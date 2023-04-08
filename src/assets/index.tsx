import { ReactComponent as DefaultCloseIcon } from './close.svg'
import { ReactComponent as DefaultEmptyIcon } from './empty.svg'
import { ReactComponent as DefaultErrorIcon } from './error.svg'
import { ReactComponent as DefaultFullScreenIcon } from './fullscreen.svg'
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

export const ErrorIcon = () => (
  <AccessibleIcon.Root label="error state">
    <DefaultErrorIcon />
  </AccessibleIcon.Root>
)

export const FullScreenIcon = () => (
  <AccessibleIcon.Root label="fullscreen">
    <DefaultFullScreenIcon />
  </AccessibleIcon.Root>
)
