import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import * as BannerStyle from 'components/Banner/styles'

export const Wrapper = styled.section`
  ${({ theme }) => css`
    .slick-dots {
      list-style: none;
      display: flex !important;
      align-items: center;
      justify-content: center;
      margin-top: ${theme.spacings.small};

      li {
        background: ${theme.colors.white};
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 100%;
        display: flex;
        align-items: center;
        margin: 0 ${theme.spacings.xxsmall};
        cursor: pointer;

        &.slick-active {
          background: ${theme.colors.primary};
        }
      }
      button {
        opacity: 0;
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
      }
    }

    ${media.greaterThan('large')`
      ${BannerStyle.Wrapper} {
        max-width: 104rem;
        margin: 0 auto;
      }

      .slick-dots {
        position: absolute;
        flex-direction: column;
        right: 3rem;
        top: 0;
        height: 100%;
        margin: 0;

        li {
          margin: ${theme.spacings.xxsmall} 0;
        }
      }


    `}
  `}
`
