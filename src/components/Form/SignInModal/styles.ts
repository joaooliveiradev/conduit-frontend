import styled, { css } from 'styled-components'

export const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 16px;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxlarge};
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    text-align: center;
    color: ${theme.colors.grey[200]};
  `}
`

export const ChangeFormBtn = styled.button`
  ${({ theme }) => css`
    background-color: unset;
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.black[100]};
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.black[100]};
    font-weight: 600;
  `}
`
