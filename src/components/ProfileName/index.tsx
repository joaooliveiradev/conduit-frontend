import { Avatar } from '@/components'
import styled, { css } from 'styled-components'

export type ProfileNameProps = {
  size: number
  name: string
}

const Name = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.black[400]};
  `}
`

const Wrapper = styled.div<Pick<ProfileNameProps, 'size'>>`
  ${({ size }) => css`
    display: grid;
    column-gap: calc((${size} * 6px) / 2);
    grid-template-columns: auto 1fr;
    ${Name} {
      font-size: calc((${size} * 1.6rem) / 2);
      font-weight: 700;
      display: flex;
      align-items: center;
    }
  `}
`
export const ProfileName = ({ size, name }: ProfileNameProps) => {
  return (
    <Wrapper size={size}>
      <Avatar size={size} name={name} />
      <Name>{name}</Name>
    </Wrapper>
  )
}
