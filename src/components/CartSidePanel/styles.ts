import { tint } from 'polished'
import styled, { css } from 'styled-components'
import * as ButtonStyles from 'components/Button/styles'
import media from 'styled-media-query'

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

export const Text = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-size: ${theme.font.sizes.medium};
    margin-top: ${theme.spacings.large};
    text-align: justify;

    > p {
      margin-bottom: ${theme.spacings.xsmall};
    }

    ${media.lessThan('medium')`
      font-size: ${theme.font.sizes.small};
      
      > p {
        margin: 0;
      }
      
    `}
  `}
`
