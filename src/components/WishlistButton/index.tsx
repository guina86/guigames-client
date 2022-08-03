import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined'
import Button, { ButtonProps } from 'components/Button'
import Spinner from 'components/Spinner'
import { useWishlist } from 'hooks/use-wishlist'

type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WishlistButton = ({ id, hasText = false, size = 'small' }: WishlistButtonProps) => {
  const [session] = useSession()
  const [loading, setLoading] = useState(false)
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const remove = isInWishlist(id)
  const text = remove ? 'Remove from Wishlist' : 'Add to wishlist'
  const icon = remove ? <Favorite aria-label={text} /> : <FavoriteBorder aria-label={text} />
  const handleClick = async () => {
    setLoading(true)
    remove ? await removeFromWishlist(id) : await addToWishlist(id)
    setLoading(false)
  }

  if (!session) return null

  return (
    <Button icon={loading ? <Spinner /> : icon} size={size} onClick={handleClick} minimal>
      {hasText && text}
    </Button>
  )
}

export default WishlistButton
