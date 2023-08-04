import {
  Overlay as DialogOverlay,
  Content as DialogContent,
  Close as DialogClose,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Root as DialogRoot,
} from '@radix-ui/react-dialog'
import { transparentize } from 'polished/'
import styled, { css } from 'styled-components'

export type ModalProps = {
  children: React.ReactNode
}

export const ModalOverlay = styled(DialogOverlay)`
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

export const ModalContent = styled(DialogContent)`
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

export const ModalCloseButton = styled(DialogClose)`
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

export { DialogRoot as ModalRoot }

export { DialogTrigger as ModalTrigger }

export { DialogPortal as ModalPortal }
