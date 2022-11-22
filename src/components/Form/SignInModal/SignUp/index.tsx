import { Button, Input } from '@/components'
import {
  Wrapper,
  Title,
  Text,
  ChangeFormBtn,
} from '@/components/Form/SignInModal/styles'


type SignUpProps = {
  onSwitchFormClick: (state: boolean) => void
}

export const SignUp = ({ onSwitchFormClick }: SignUpProps) => {
  return (
    <Wrapper>
      <Title>Sign up</Title>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Button size="large">Sign up</Button>
      <Text>
        Already have an account?{' '}
        <ChangeFormBtn type="button" onClick={() => onSwitchFormClick(true)}>
          Sign in
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}
