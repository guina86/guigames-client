import { MockedProvider } from '@apollo/client/testing'
import { act, renderHook, waitFor } from '@testing-library/react'
import { setStorageItem } from 'utils/localStorage'

import { useCart, CartProvider, CartProviderProps } from '.'
import { cartItems, gamesMock } from './mock'

describe('useCart', () => {
  const renderSut = () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )
    return renderHook(() => useCart(), { wrapper })
  }
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should return items and its info if there are any in the cart', async () => {
    setStorageItem('cartItems', ['1', '2'])

    const { result } = renderSut()

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(cartItems)
    })
    expect(result.current.loading).toBe(false)
    expect(result.current.quantity).toBe(2)
    expect(result.current.total).toBe('$21.00')
  })

  it('should return true if cart is already in the cart', async () => {
    setStorageItem('cartItems', ['1'])
    const { result } = renderSut()

    expect(result.current.isInCart('1')).toBe(true)
    expect(result.current.isInCart('2')).toBe(false)
  })

  it('should add item in the cart', () => {
    const { result } = renderSut()

    act(() => {
      result.current.addToCart('1')
    })

    expect(result.current.quantity).toBe(1)
    expect(window.localStorage.getItem('GUIGAMES_cartItems')).toBe(JSON.stringify(['1']))
  })

  it('should remove item from the cart', () => {
    setStorageItem('cartItems', ['1'])
    const { result } = renderSut()

    act(() => {
      result.current.removeFromCart('1')
    })

    expect(result.current.quantity).toBe(0)
    expect(window.localStorage.getItem('GUIGAMES_cartItems')).toBe(JSON.stringify([]))
  })

  it('should clear the cart', () => {
    setStorageItem('cartItems', ['1', '2', '3'])
    const { result } = renderSut()

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.quantity).toBe(0)
    expect(window.localStorage.getItem('GUIGAMES_cartItems')).toBe(JSON.stringify([]))
  })
})
