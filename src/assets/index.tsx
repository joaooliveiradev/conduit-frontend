import { ReactComponent as DefaultCloseIcon } from './close.svg'
import { ReactComponent as DefaultEmptyIcon } from './empty.svg'
import { ReactComponent as DefaultErrorStateIcon } from './error-state.svg'
import { ReactComponent as DefaultFullScreenIcon } from './fullscreen.svg'
import { ReactComponent as DefaultCheckIcon } from './check.svg'
import { ReactComponent as DefaultExclamationIcon } from './exclamation.svg'
import { ReactComponent as DefaultExitFullScreenIcon } from './exit-fullscreen.svg'
import { Root as AccessibleIconRoot } from '@radix-ui/react-accessible-icon'

type SVGProps = {
  label?: string
} & React.SVGProps<SVGSVGElement>

export const CloseIcon = ({
  width = 24,
  height = 24,
  label = 'close',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultCloseIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)

export const EmptyIcon = ({
  width = 136,
  height = 126,
  label = 'empty state',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultEmptyIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)

export const ErrorStateIcon = ({
  width = 120,
  height = 124,
  label = 'error state',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultErrorStateIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)

export const FullScreenIcon = ({
  width = 24,
  height = 24,
  label = 'fullscreen',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultFullScreenIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)

export const ExitFullScreenIcon = ({
  width = 24,
  height = 24,
  label = 'exit fullscreen',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultExitFullScreenIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)

export const CheckIcon = ({
  width = 24,
  height = 24,
  label = 'check',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultCheckIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)

export const ExclamationIcon = ({
  width = 24,
  height = 24,
  label = 'exclamation error',
  ...rest
}: SVGProps) => (
  <AccessibleIconRoot label={label}>
    <DefaultExclamationIcon width={width} height={height} {...rest} />
  </AccessibleIconRoot>
)
