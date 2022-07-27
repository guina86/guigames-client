import { darken } from 'polished'
import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

export type WrapperProps = ButtonProps & { hasIcon: boolean }

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
    padding: ${theme.spacings.xxsmall} 1rem;
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  fullWidth: () => css`
    width: 100%;
  `,
  hasIcon: (theme: DefaultTheme) => css`
    svg {
      width: 1.7rem;

      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `,
  minimal: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.primary};
    transition: color 0.2s ease-in-out;

    &:hover {
      background: none;
      color: ${darken(0.2, theme.colors.primary)};
    }
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      filter: saturate(30%);
    }
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, fullWidth, hasIcon, minimal, disabled }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    color: ${theme.colors.white};
    border: none;
    cursor: pointer;
    border-radius: ${theme.border.radius};
    text-decoration: none;

    &:hover {
      background: linear-gradient(180deg, #e35565 0%, #d978a6 50%);
    }

    ${wrapperModifiers[size!](theme)};
    ${fullWidth && wrapperModifiers.fullWidth()}
    ${hasIcon && wrapperModifiers.hasIcon(theme)}
    ${minimal && wrapperModifiers.minimal(theme)}
    ${disabled && wrapperModifiers.disabled()}
  `}
`
