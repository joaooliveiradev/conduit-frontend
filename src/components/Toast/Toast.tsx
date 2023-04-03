import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ReactComponent as CloseIcon } from '@/assets/close.svg'
import * as RadixToast from '@radix-ui/react-toast'

export type ToastProps = {
  title: string
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
  label?: string
} & RadixToast.ToastProps

const Root = styled(RadixToast.Root)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.xmedium} ${theme.spacings.xxsmall};
    gap: ${theme.spacings.small};
    align-items: center;
    background-color: ${theme.colors.grey[500]};
    border-radius: ${theme.spacings.small};
  `}

  &[data-state="open"] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: hide 100ms ease-in;
  }

  &[data-swipe='end'] {
    animation: swipeOut 150ms ease-out;
  }

  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }

  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + 8px));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes swipeOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateX(calc(100% + 8px));
    }
  }
`

const Viewport = styled(RadixToast.Viewport)`
  width: 308px;
  border-radius: 6px;
  position: fixed;
  right: 220px;
  top: 160px;
`

const Title = styled(RadixToast.Title)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    line-height: 29px;
    letter-spacing: -0.04em;
    font-weight: 600;
  `}
`

const Description = styled(RadixToast.Description)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    text-align: center;
  `}
`

const Close = styled(RadixToast.Close)`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.spacings.xsmall};
    right: ${theme.spacings.xsmall};
    padding: 6px;
    display: flex;
    background-color: ${transparentize(0.8, theme.colors.grey[300])};
    border-radius: 9999px;
    cursor: pointer;
  `}
`

export const Toast = ({
  title,
  description,
  open,
  onOpenChange,
  duration,
  type,
  label,
}: ToastProps) => (
  <RadixToast.Provider label={label}>
    <Root open={open} onOpenChange={onOpenChange} duration={duration} type={type}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Close aria-label="Close">
        <CloseIcon />
      </Close>
    </Root>
    <Viewport />
  </RadixToast.Provider>
)
