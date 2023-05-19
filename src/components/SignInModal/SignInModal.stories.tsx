import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, SignInModal, type SignInModalProps } from '@/components'
import styled from 'styled-components'

const meta: Meta<SignInModalProps> = {
  component: SignInModal,
}

export default meta

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

const Template = () => {
  const [open, setOnOpenChange] = useState(false)
  return (
    <Wrapper>
      <Button size="large" onClick={() => setOnOpenChange(true)}>
        Abrir
      </Button>
      <SignInModal open={open} onOpenChange={setOnOpenChange} showSignInFirst />
    </Wrapper>
  )
}

export const Default: StoryObj<SignInModalProps> = {
  render: () => <Template />,
}
