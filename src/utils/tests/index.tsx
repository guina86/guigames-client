import { render, RenderOptions } from '@testing-library/react'
import { CartContext, CartContextData, CartContextDefaultValues } from 'hooks/use-cart'
import {
  WishlistContext,
  WishlistContextData,
  WishlistContextDefaultValues
} from 'hooks/use-wishlist'
import { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

type CustomRenderProps = {
  cartProviderProps?: Partial<CartContextData>
  wishlistProviderProps?: Partial<WishlistContextData>
} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  { cartProviderProps, wishlistProviderProps, ...renderOptions }: CustomRenderProps = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={{ ...CartContextDefaultValues, ...cartProviderProps }}>
        <WishlistContext.Provider
          value={{ ...WishlistContextDefaultValues, ...wishlistProviderProps }}
        >
          {ui}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }
