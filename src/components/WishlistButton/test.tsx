import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'
import { WishlistContextData } from 'hooks/use-wishlist'
import WishlistButton from '.'

const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
let session: any | null = { jwt: '123', user: { email: 'any@email.com' } }
useSession.mockImplementation(() => [session])

describe('<WishlistButton />', () => {
  const renderSut = (props: Partial<WishlistContextData> & { hasText?: boolean }) =>
    render(<WishlistButton id="1" hasText={props.hasText} />, {
      wishlistProviderProps: props
    })

  it('should render a button to add to wishlist', () => {
    renderSut({ isInWishlist: () => false })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to remove from wishlist', () => {
    renderSut({ isInWishlist: () => true })

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to add to wishlist with text', () => {
    renderSut({ isInWishlist: () => false, hasText: true })

    expect(screen.getByText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to remove to wishlist with text', () => {
    renderSut({ isInWishlist: () => true, hasText: true })

    expect(screen.getByText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should add to wishlist', async () => {
    const addToWishlist = jest.fn()
    renderSut({ isInWishlist: () => false, addToWishlist, hasText: true })

    await userEvent.click(screen.getByRole('button', { name: /add to wishlist/i }))

    expect(addToWishlist).toHaveBeenCalledWith('1')
  })

  it('should remove from wishlist', async () => {
    const removeFromWishlist = jest.fn()
    renderSut({ isInWishlist: () => true, removeFromWishlist, hasText: true })

    await userEvent.click(screen.getByRole('button', { name: /remove from wishlist/i }))

    expect(removeFromWishlist).toHaveBeenCalledWith('1')
  })

  it('should not render if not logged', () => {
    session = null
    renderSut({ isInWishlist: () => true, hasText: true })

    expect(screen.queryByText(/remove from wishlist/i)).not.toBeInTheDocument()
  })
})
