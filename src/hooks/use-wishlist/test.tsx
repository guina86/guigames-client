import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useWishlist, WishlistProvider } from '.'
import {
  createWishlistMock,
  removeWishlistMock,
  updateWishlistMock,
  wishlistItems,
  wishlistMock
} from './mock'

const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
const session = { jwt: '123', user: { email: 'any@email.com' } }
useSession.mockImplementation(() => [session])

describe('Name of the group', () => {
  const renderSut = (mocks: ReadonlyArray<MockedResponse> = [wishlistMock]) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )
    return renderHook(() => useWishlist(), { wrapper })
  }

  it('should return wishlist items', async () => {
    const { result } = renderSut()

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(wishlistItems.slice(0, 2))
    })
  })

  it('should check if the game is in the wishlist', async () => {
    const { result } = renderSut()

    await waitFor(() => {
      expect(result.current.isInWishlist('1')).toBe(true)
    })
    expect(result.current.isInWishlist('2')).toBe(true)
    expect(result.current.isInWishlist('3')).toBe(false)
  })

  it('should add item in wishlist creating a news list', async () => {
    const { result } = renderSut([createWishlistMock])

    act(() => {
      result.current.addToWishlist('3')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[2]])
    })
  })

  it('should add item in wishlist updating current list', async () => {
    const { result } = renderSut([wishlistMock, updateWishlistMock])

    await waitFor(() => {
      expect(result.current.isInWishlist('2')).toBe(true)
    })

    act(() => {
      result.current.addToWishlist('3')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(wishlistItems)
    })
  })

  it('should remove item from wishlist updating current list', async () => {
    const { result } = renderSut([wishlistMock, removeWishlistMock])

    await waitFor(() => {
      expect(result.current.isInWishlist('1')).toBe(true)
    })

    act(() => {
      result.current.removeFromWishlist('1')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[1]])
    })
  })
})
