import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { CloseIcon } from '@/components'
import {
  type ToastProps as RadixToastProps,
  Root as ToastRoot,
  Viewport as ToastViewport,
  Title as ToastTitle,
  Description as ToastDescription,
  Close as ToastClose,
  Provider,
} from '@radix-ui/react-toast'

export type ToastProps = {
  title: string
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
  label?: string
} & RadixToastProps

const Root = styled(ToastRoot)`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.xmedium} ${theme.spacings.xxsmall};
    gap: ${theme.spacings.small};
    align-items: center;
    background-color: ${theme.colors.grey[500]};
    border-radius: ${theme.spacings.small};
  `}

  &[data-state='open'] {
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

const Viewport = styled(ToastViewport)`
  ${({ theme }) => css`
    max-width: 100vw;
    width: 400px;
    border-radius: 6px;
    position: fixed;
    right: ${theme.spacings.xmedium};
    top: ${theme.spacings.xmedium};
    margin: ${theme.spacings.xmedium};
  `}
`

const Title = styled(ToastTitle)`
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  line-height: 29px;
  letter-spacing: -0.04em;
  font-weight: 600;
`

const Description = styled(ToastDescription)`
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  text-align: center;
`

const Close = styled(ToastClose)`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.spacings.xsmall};
    right: ${theme.spacings.xsmall};
    padding: ${theme.spacings.small};
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
  <Provider label={label}>
    <Root
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      type={type}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Close>
        <CloseIcon />
      </Close>
    </Root>
    <Viewport />
  </Provider>
)
