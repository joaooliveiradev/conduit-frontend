import { ReactComponent as DefaultCloseIcon } from './close.svg'
import { ReactComponent as DefaultEmptyIcon } from './empty.svg'
import { ReactComponent as DefaultErrorStateIcon } from './error-state.svg'
import { ReactComponent as DefaultFullScreenIcon } from './fullscreen.svg'
import { ReactComponent as DefaultCheckIcon } from './check.svg'
import { ReactComponent as DefaultExclamationIcon } from './exclamation.svg'
import { ReactComponent as DefaultExitFullScreenIcon } from './exit-fullscreen.svg'
import * as AccessibleIcon from '@radix-ui/react-accessible-icon'

type SVGProps = {
  label?: string
} & React.SVGProps<SVGSVGElement>

export const CloseIcon = ({
  width = 24,
  height = 24,
  label = 'close',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultCloseIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)

export const EmptyIcon = ({
  width = 136,
  height = 126,
  label = 'empty state',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultEmptyIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)

export const ErrorStateIcon = ({
  width = 120,
  height = 124,
  label = 'error state',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultErrorStateIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)

export const FullScreenIcon = ({
  width = 24,
  height = 24,
  label = 'fullscreen',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultFullScreenIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)

export const ExitFullScreenIcon = ({
  width = 24,
  height = 24,
  label = 'exit fullscreen',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultExitFullScreenIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)

export const CheckIcon = ({
  width = 24,
  height = 24,
  label = 'check',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultCheckIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)

export const ExclamationIcon = ({
  width = 24,
  height = 24,
  label = 'exclamation error',
  ...rest
}: SVGProps) => (
  <AccessibleIcon.Root label={label}>
    <DefaultExclamationIcon width={width} height={height} {...rest} />
  </AccessibleIcon.Root>
)
