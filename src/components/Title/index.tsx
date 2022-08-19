import { TitleWrapper } from './styles'

type TitleProps = {
  color: string
}

export const Title = ({ color }: TitleProps) => (
  <TitleWrapper color={color}>Hello World</TitleWrapper>
)
