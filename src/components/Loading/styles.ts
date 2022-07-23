import styled, { css } from 'styled-components'

type LoadingProps = {
  color: 'primary' | 'secondary'
}

export const Spinner = styled.div<LoadingProps>`
  ${({ theme, color }) => css`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    & > div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: ${theme.colors[color]};
      animation-timing-function: cubic-bezier(0, 1, 1, 0);

      &:nth-child(1) {
        left: 0.8rem;
        animation: spinner1 0.6s infinite;
      }
      &:nth-child(2) {
        left: 0.8rem;
        animation: spinner2 0.6s infinite;
      }
      &:nth-child(3) {
        left: 3.2rem;
        animation: spinner2 0.6s infinite;
      }
      &:nth-child(4) {
        left: 5.6rem;
        animation: spinner3 0.6s infinite;
      }
    }

    @keyframes spinner1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes spinner3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes spinner2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
  `}
`
