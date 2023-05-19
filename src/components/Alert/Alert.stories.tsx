import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import { useState } from 'react'
import {
  type AlertProps,
  Alert,
  TextButton,
  Button as DefaultButton,
} from '@/components'

const meta: Meta<AlertProps> = {
  component: Alert,
  argTypes: {
    status: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

const WrapperContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.xsmall};
`

const Button = styled(DefaultButton)`
  margin-top: 16px;
`

const defaultOpenValue = true

const SuccessAlert = () => {
  const [open, setIsOpen] = useState(defaultOpenValue)
  return (
    <>
      <Alert status="success" open={open} onOpenChange={setIsOpen}>
        <WrapperContent>
          <Alert.Icon />
          <Alert.Text>Your article has been successfully created.</Alert.Text>
          <TextButton href="/article/test">View</TextButton>
          <Alert.Close />
        </WrapperContent>
      </Alert>
      <Button size="large" onClick={() => setIsOpen(defaultOpenValue)}>
        Reset
      </Button>
    </>
  )
}

export const SuccessControlledAlert: StoryObj<AlertProps> = {
  render: () => <SuccessAlert />,
}

export const ErrorUncontrolledAlert: StoryObj<AlertProps> = {
  render: () => (
    <Alert status="error">
      <WrapperContent>
        <Alert.Icon />
        <Alert.Text>
          Something unexpected happened. Please try again later.
        </Alert.Text>
        <Alert.Close />
      </WrapperContent>
    </Alert>
  ),
}
