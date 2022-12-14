import { tint } from 'polished'
import styled, { css } from 'styled-components'
import * as EmptyStyles from 'components/Empty/styles'

type WrapperProps = {
  isEmpty: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isEmpty }) => css`
    background: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    align-self: flex-start;

    ${isEmpty &&
    css`
      ${EmptyStyles.Wrapper} {
        padding-bottom: ${theme.spacings.medium};
      }
      ${EmptyStyles.Description} {
        color: ${theme.colors.black};
        font-size: ${theme.font.sizes.medium};
      }
      ${EmptyStyles.Title} {
        font-size: ${theme.font.sizes.large};
      }
    `}
  `}
`

export const GamesList = styled.div`
  max-height: 40rem;
  overflow-y: auto;
`

export const Footer = styled.div`
  ${({ theme }) => css`
    background: ${tint(0.2, theme.colors.lightGray)};
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.small};
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`

export const Total = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40rem;
    min-width: 56rem;
  `}
`
