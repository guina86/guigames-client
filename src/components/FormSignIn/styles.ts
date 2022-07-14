import styled, { css } from 'styled-components'

export const ForgotPassword = styled.a`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.black};
    font-size: ${theme.font.sizes.small};
    text-decoration: none;
    text-align: end;
    transition: color, ${theme.transition.fast};

    &:hover {
      color: ${theme.colors.gray};
    }
  `}
`
