import * as Dialog from '@radix-ui/react-dialog'
import { transparentize } from 'polished'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as CloseIcon } from '@assets/close.svg'

export type ModalProps = {
  trigger: ReactNode
}

const Overlay = styled(Dialog.Overlay)`
  ${({ theme }) => css`
    position: fixed;
    inset: 0;
    background-color: ${transparentize(0.6, theme.colors.black[100])};
  `}
`

const Content = styled(Dialog.Content)`
  ${({ theme }) => css`
    border-radius: 4px;
    max-width: 40rem;
    width: 100%;
    height: 35rem;
    display: flex;
    flex-direction: column;
    padding: 16px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.colors.white[100]};
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

export const Modal = ({ trigger }: ModalProps) => {
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
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}