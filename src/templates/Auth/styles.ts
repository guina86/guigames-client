import styled, { css } from 'styled-components'

import * as HeadingStyles from 'components/Heading/styles'
import * as LogoStyles from 'components/Logo/styles'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  ${media.lessThan('medium')`
  grid-template-columns: 1fr;
  `}
`

export const BannerBlock = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: ${theme.spacings.xxlarge} ${theme.spacings.xxlarge} ${theme.spacings.large};

    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${theme.colors.black};
      opacity: 0.85;
    }

    ${media.lessThan('medium')`
      display: none;
    `}
  `}
`

export const BannerContent = styled.div`
  ${({ theme }) => css`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;
    justify-content: space-between;
    color: ${theme.colors.white};
    position: relative;
    z-index: ${theme.layers.base};

    a {
      width: fit-content;
      height: fit-content;
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    display: grid;
    align-items: center;
    justify-content: center;
  `}
`

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    width: 36rem;

    ${LogoStyles.Wrapper} {
      margin: 0 auto ${theme.spacings.xxlarge};
    }

    ${HeadingStyles.Wrapper} {
      margin-bottom: ${theme.spacings.medium};
    }

    ${media.lessThan('medium')`
      width: 30rem;
    `}
  `}
`

export const Subtitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.light};
    margin-top: ${theme.spacings.xxsmall};

    strong {
      color: ${theme.colors.primary};
    }
  `}
`

export const Footer = styled.footer`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    align-self: end;
    text-align: center;
  `}
`
