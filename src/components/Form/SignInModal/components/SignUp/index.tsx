import Button from '@components/Button'
import Input from '@components/Input'
import { Wrapper, Title, Text, ChangeFormBtn } from '@components/Form/SignInModal/components/styles'

type SignUpProps = {
  handleClick: (state: boolean) => void
}

const SignUp = ({ handleClick }: SignUpProps) => {
  return (
    <Wrapper>
      <Title>Sign up</Title>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <Button size="large">Sign up</Button>
      <Text>
        Already have an account?{' '}
        <ChangeFormBtn onClick={() => handleClick(true)}>Sign in</ChangeFormBtn>{' '}
        now.
      </Text>
    </Wrapper>
  )
}

export default SignUp
