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

export const Card = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xlarge};
    margin-bottom: ${theme.spacings.xxsmall};
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
    padding-top: ${theme.spacings.xsmall};
    display: flex;
    align-items: center;

    & > svg {
      margin-right: ${theme.spacings.xxsmall};
    }
  `}
`

export const FreeGames = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black};
  `}
`
