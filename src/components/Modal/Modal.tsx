import { CloseIcon } from '@/components'
import { transparentize } from 'polished/'
import styled, { css } from 'styled-components'
import {
  Overlay as DialogOverlay,
  Content as DialogContent,
  Close as DialogClose,
  Title as DialogTitle,
  Description as DialogDescription,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dialog'

export type ModalProps = {
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Overlay = styled(DialogOverlay)`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) =>
    transparentize(0.6, theme.colors.black[100])};
  animation: overlayShow 150ms ease-in;
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Content = styled(DialogContent)`
  ${({ theme }) => css`
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.xxsmall};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.colors.white[100]};
    animation: contentShow 150ms ease;
    @keyframes contentShow {
      from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `}
`

const CloseButton = styled(DialogClose)`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.spacings.xxsmall};
    right: ${theme.spacings.xxsmall};
    padding: ${theme.spacings.small};
    display: flex;
    background-color: ${transparentize(0.8, theme.colors.grey[300])};
    border-radius: 9999px;
    cursor: pointer;
  `}
`

export const Title = styled(DialogTitle)`
  font-size: ${({ theme }) => theme.fonts.sizes.large};
`

export const Description = styled(DialogDescription)`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
`

export const Modal = ({
  trigger,
  children,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Trigger asChild>{trigger}</Trigger>}
      <Portal>
        <Overlay />
        <Content>
          {children}
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </Content>
      </Portal>
    </Root>
  )
}
