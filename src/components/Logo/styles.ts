import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import { LogoProps } from '.'

const wrapperModifiers = {
  normal: () => css`
    width: 17rem;
    height: 3.4;
  `,
  large: () => css`
    width: 30rem;
    height: 6rem;
  `,
  hideOnMobile: () => css`
    ${media.lessThan('medium')`
      width: 5.8rem;
      height: 4.7rem;
      overflow: hidden;

      svg {
        width: 6;
        height: 4rem;
        pointer-events: none;
      }

      .text {
        display: none;
      }
    `}
  `
}

export const Wrapper = styled.div<LogoProps>`
  ${({ theme, color, size, hideOnMobile }) => css`
    padding-top: 0.8rem;
    color: ${theme.colors[color!]};
    ${wrapperModifiers[size!]};
    ${hideOnMobile && wrapperModifiers.hideOnMobile}
  `}
`
