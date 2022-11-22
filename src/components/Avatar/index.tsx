import styled, { css } from 'styled-components'

export type AvatarProps = {
  name: string
  size: number
}

const Wrapper = styled.div<Omit<AvatarProps, 'name'>>`
  ${({ size, theme }) => css`
    width: calc(${size} * 1.6rem);
    height: calc(${size} * 1.6rem);
    background-color: ${theme.colors.black[100]};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: calc((${size} * 1.6rem) / 2);
    color: ${theme.colors.white[100]};
  `}
`

export const Avatar = ({ name, size }: AvatarProps) => {
  const arrOfLetters = name.split('')
  const onlyLettersRegex = /^[a-zA-ZÀ-ÿ]+$/
  const firstLetter = arrOfLetters.find((letter) =>
    letter.match(onlyLettersRegex)
  )
  return (
    <Wrapper size={size}>
      {firstLetter ? firstLetter.toUpperCase() : 'J'}
    </Wrapper>
  )
}

