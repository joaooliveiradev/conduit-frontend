import type { Meta, Story } from '@storybook/react'
import { useState } from 'react'
import { Button, SignInModal, type SignInModalProps } from '@/components'
import styled from 'styled-components'

const stories: Meta<SignInModalProps> = {
  component: SignInModal,
}

export default stories

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

export const Default: Story<SignInModalProps> = () => {
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
