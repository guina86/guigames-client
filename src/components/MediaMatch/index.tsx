import styled, { css } from 'styled-components'
import media, { DefaultBreakpoints } from 'styled-media-query'

type BreakPoint = keyof DefaultBreakpoints

export type MediaMatchProps = {
  lessThan?: BreakPoint
  greaterThan?: BreakPoint
}

const mediaMatchModifiers = {
  lessThan: (size: BreakPoint) => css`
    ${media.lessThan(size)` display: block`}
  `,
  greaterThan: (size: BreakPoint) => css`
    ${media.greaterThan(size)` display: block`}
  `
}

export default styled.div<MediaMatchProps>`
  ${({ lessThan, greaterThan }) => css`
    display: none;
    ${!!lessThan && mediaMatchModifiers.lessThan(lessThan)}
    ${!!greaterThan && mediaMatchModifiers.greaterThan(greaterThan)}
  `}
`
