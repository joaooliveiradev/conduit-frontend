import * as RadixToast from '@radix-ui/react-toast'
import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

export type ToastProps = {
  title: string
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const Root = styled(RadixToast.Root)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.xxsmall};
    gap: ${theme.spacings.small};
    align-items: center;
  `}

  &[data-state="open"] {
    animation: slideIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  [data-swipe='end'] {
    animation: swipeOut 200ms ease-out;
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
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(100% + 8px));
    }
  }
`

const Viewport = styled(RadixToast.Viewport)`
  ${({ theme }) => css`
    width: 308px;
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    border-radius: 6px;
    position: fixed;
    right: 240px;
    bottom: 142px;
  `}
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

const oneSecond = 1000

export const Toast = ({
  title,
  description,
  open,
  onOpenChange,
}: ToastProps) => (
  <RadixToast.Provider duration={oneSecond}>
    <Root open={open} onOpenChange={onOpenChange} duration={oneSecond}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Root>
    <Viewport />
  </RadixToast.Provider>
)

