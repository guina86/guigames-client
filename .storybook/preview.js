import { RouterContext } from 'next/dist/shared/lib/router-context'
import { ThemeProvider } from 'styled-components'
import { CartContext, CartContextDefaultValues } from 'hooks/use-cart'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

export const parameters = {
  backgrounds: {
    default: 'gui-dark',
    values: [
      {
        name: 'gui-light',
        value: theme.colors.white
      },
      {
        name: 'gui-dark',
        value: theme.colors.mainBg
      }
    ]
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={{
        ...CartContextDefaultValues,
        ...(context?.args?.cartContextValue || {}),
        ...context.args
      }}>
        <GlobalStyles />
        <Story />
      </CartContext.Provider>
    </ThemeProvider >
  )
]