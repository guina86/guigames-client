import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Main = styled.main`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};
    display: grid;
    grid-template-columns: 1fr;

    ${media.greaterThan('medium')`
      grid-template-columns: 24rem 1fr;
      grid-gap: calc(${theme.grid.gutter} * 1.5);
    `}
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall};
  `}
`
