import { Button, Input } from '@/components'
import {
  Wrapper,
  Title,
  Text,
  ChangeFormBtn,
} from '@/components/Form/SignInModal/styles'


type SignUpProps = {
  handleClick: (state: boolean) => void
}

export const SignUp = ({ handleClick }: SignUpProps) => {
  return (
    <Wrapper>
      <Title>Sign up</Title>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Button size="large">Sign up</Button>
      <Text>
        Already have an account?{' '}
        <ChangeFormBtn type="button" onClick={() => handleClick(true)}>
          Sign in
        </ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}
