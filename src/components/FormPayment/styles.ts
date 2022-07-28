import { tint } from 'polished'
import styled, { css, DefaultTheme } from 'styled-components'
import * as ButtonStyles from 'components/Button/styles'

export const Wrapper = styled.main``

export const Body = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacings.small};
  `}
`
export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: ${theme.spacings.small};
    background: ${tint(0.2, theme.colors.lightGray)};
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    align-items: center;
    gap: ${theme.spacings.xxsmall};

    ${ButtonStyles.Wrapper} {
      padding-left: ${theme.spacings.xxsmall};
      padding-right: ${theme.spacings.xxsmall};
      outline: 0;
    }
  `}
`
