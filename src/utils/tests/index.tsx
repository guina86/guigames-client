import { render, RenderOptions } from '@testing-library/react'
import { CartContext, CartContextData, CartContextDefaultValues } from 'hooks/use-cart'
import { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

type CustomRenderProps = {
  cartProviderProps?: Partial<CartContextData>
} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  { cartProviderProps, ...renderOptions }: CustomRenderProps = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={{ ...CartContextDefaultValues, ...cartProviderProps }}>
        {ui}
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }
