import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'
import WishlistButton from '.'

const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
let session: any | null = { jwt: '123', user: { email: 'any@email.com' } }
useSession.mockImplementation(() => [session])

describe('<WishlistButton />', () => {
  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps = {
      isInWishlist: () => false
    }
    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to remove from wishlist', () => {
    const wishlistProviderProps = {
      isInWishlist: () => true
    }
    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to add to wishlist with text', () => {
    const wishlistProviderProps = {
      isInWishlist: () => false
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.getByText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to remove to wishlist with text', () => {
    const wishlistProviderProps = {
      isInWishlist: () => true
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.getByText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should add to wishlist', async () => {
    const wishlistProviderProps = {
      isInWishlist: () => false,
      addToWishlist: jest.fn()
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    await userEvent.click(screen.getByRole('button', { name: /add to wishlist/i }))

    expect(wishlistProviderProps.addToWishlist).toHaveBeenCalledWith('1')
  })

  it('should remove from wishlist', async () => {
    const wishlistProviderProps = {
      isInWishlist: () => true,
      removeFromWishlist: jest.fn()
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    await userEvent.click(screen.getByRole('button', { name: /remove from wishlist/i }))

    expect(wishlistProviderProps.removeFromWishlist).toHaveBeenCalledWith('1')
  })

  it('should not render if not logged', () => {
    session = null

    const wishlistProviderProps = {
      isInWishlist: () => true
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.queryByText(/remove from wishlist/i)).not.toBeInTheDocument()
  })
})
