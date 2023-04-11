import type { Story, Meta } from '@storybook/react'
import { Alert, type AlertProps, TextButton } from '@/components'
import styled from 'styled-components'

const stories: Meta<AlertProps> = {
  component: Alert,
  argTypes: {
    status: {
      table: {
        disable: true
      }
    }
  }
}

export default stories

const WrapperContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.xsmall};
`

export const SuccessAlert: Story<AlertProps> = () => (
  <Alert status="success">
    <WrapperContent>
      <Alert.Icon />
      <Alert.Text>Your article has been successfully created.</Alert.Text>
      <TextButton href="/article/test">View</TextButton>
    </WrapperContent>
  </Alert>
)

export const ErrorAlert: Story<AlertProps> = () => (
  <Alert status="error">
    <WrapperContent>
      <Alert.Icon />
      <Alert.Text>
        Something unexpected happened. Please try again later.
      </Alert.Text>
    </WrapperContent>
  </Alert>
)
