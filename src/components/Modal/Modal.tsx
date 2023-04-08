import { CloseIcon } from '@/assets'
import { transparentize } from 'polished'
import { type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export type ModalProps = {
  trigger?: ReactNode
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Overlay = styled(Dialog.Overlay)`
  ${({ theme }) => css`
    position: fixed;
    inset: 0;
    background-color: ${transparentize(0.6, theme.colors.black[100])};
    animation: overlayShow 150ms ease-in;
    @keyframes overlayShow {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}
`

const Content = styled(Dialog.Content)`
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

const IconButton = styled.button`
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

export const Title = styled(Dialog.Title)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.large};
  `}
`

export const Description = styled(Dialog.Description)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.medium};
  `}
`

export const Modal = ({
  trigger,
  children,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Overlay />
        <Content>
          {children}
          <Dialog.Close asChild>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Dialog.Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
