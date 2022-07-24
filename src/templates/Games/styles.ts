import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Content = styled.div`
  ${({ theme }) => css`
    ${media.greaterThan('medium')`
      display: grid;
      grid-template-columns: 24rem 1fr;
      gap: ${theme.grid.gutter};
    `}
  `}
`

export const ShowMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
`

export const ShowMoreButton = styled.div`
  ${({ theme }) => css`
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    color: ${theme.colors.white};

    > svg {
      color: ${theme.colors.primary};
    }
  `}
`

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`
