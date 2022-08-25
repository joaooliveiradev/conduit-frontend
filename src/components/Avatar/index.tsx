import styled, { css } from 'styled-components'

export type AvatarProps = {
  name: string
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

const Wrapper = styled.div<Omit<AvatarProps, 'name'>>`
  ${({ size, theme }) => css`
    width: calc(${size} * 1.6rem);
    height: calc(${size} * 1.6rem);
    background-color: ${theme.colors.darkBlack};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: calc((${size} * 1.6rem) / 2);
    color: ${theme.colors.white};
  `}
`

const Avatar = ({ name, size }: AvatarProps) => {
  const arrOfLetters = name.split('')
  const onlyLettersRegex = /^[A-Za-z]+$/
  const firstLetter = arrOfLetters.find((letter) =>
    letter.match(onlyLettersRegex)
  )
  return (
    <Wrapper size={size}>
      {firstLetter ? firstLetter.toUpperCase() : 'J'}
    </Wrapper>
  )
}

export default Avatar
