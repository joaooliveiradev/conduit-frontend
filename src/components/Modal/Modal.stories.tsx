import {
  ModalRoot,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalTrigger,
  CloseIcon,
  Button,
} from '@/components'
import type { Meta, StoryObj } from '@storybook/react'
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import styled from 'styled-components'

const meta: Meta = {
  component: ModalRoot,
}

export default meta

const Title = styled(DialogTitle)`
  font-size: ${({ theme }) => theme.fonts.sizes.large};
`

const Description = styled(DialogDescription)`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
`

export const Default: StoryObj = {
  render: () => (
    <ModalRoot>
      <ModalTrigger>
        <Button size="large">Sign in</Button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent>
          <div>
            <Title>Title</Title>
            <Description>Description</Description>
          </div>
          <ModalCloseButton>
            <CloseIcon />
          </ModalCloseButton>
        </ModalContent>
      </ModalPortal>
    </ModalRoot>
  ),
}
