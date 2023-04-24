import type { Story, Meta } from '@storybook/react'
import {
  Alert,
  type AlertProps,
  TextButton,
  Button as DefaultButton,
} from '@/components'
import styled from 'styled-components'
import { useState } from 'react'

const stories: Meta<AlertProps> = {
  component: Alert,
  argTypes: {
    status: {
      table: {
        disable: true,
      },
    },
  },
}

export default stories

const WrapperContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.xsmall};
`

const Button = styled(DefaultButton)`
  margin-top: 16px;
`

const defaultOpenValue = true

export const SuccessAlert: Story<AlertProps> = () => {
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
      <Button
        size="large"
        onClick={() => setIsOpen(defaultOpenValue)}
      >
        Reset
      </Button>
    </>
  )
}

export const ErrorAlert: Story<AlertProps> = () => (
  <Alert status="error">
    <WrapperContent>
      <Alert.Icon />
      <Alert.Text>
        Something unexpected happened. Please try again later.
      </Alert.Text>
      <Alert.Close />
    </WrapperContent>
  </Alert>
)
