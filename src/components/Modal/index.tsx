import * as Dialog from '@radix-ui/react-dialog'
import { transparentize } from 'polished'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as CloseIcon } from '@assets/close.svg'

export type ModalProps = {
  trigger: ReactNode
  children: ReactNode
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
    max-width: 40rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
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

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const IconButton = styled.button`
  ${({ theme }) => css`
    all: unset;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${transparentize(0.8, theme.colors.grey[300])};
    border-radius: 50%;
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

export const Modal = ({ trigger, children }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Close asChild>
            <CloseWrapper>
              <IconButton aria-label="Close">
                <CloseIcon />
              </IconButton>
            </CloseWrapper>
          </Dialog.Close>
          {children}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}