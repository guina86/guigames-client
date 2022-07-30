import Button from 'components/Button'
import Empty from 'components/Empty'
import GameItem from 'components/GameItem'
import Loading from 'components/Loading'
import { useCart } from 'hooks/use-cart'
import Link from 'next/link'
import * as S from './styles'

export type CartListProps = {
  hasButton?: boolean
  hasLinks?: boolean
}

const CartList = ({ hasButton = false, hasLinks = true }: CartListProps) => {
  const { items, total, loading } = useCart()

  if (loading)
    return (
      <S.LoadingWrapper>
        <Loading />
      </S.LoadingWrapper>
    )

  return (
    <S.Wrapper isEmpty={items.length === 0}>
      {items.length > 0 ? (
        <>
          <S.GamesList>
            {items.map((item) => (
              <GameItem key={item.title} {...item} hasLink={hasLinks} />
            ))}
          </S.GamesList>
          <S.Footer>
            {!hasButton && <span>Total</span>}
            <S.Total>{total}</S.Total>

            {hasButton && (
              <Link href="/cart" passHref>
                <Button as="a">Open cart</Button>
              </Link>
            )}
          </S.Footer>
        </>
      ) : (
        <Empty
          title="Your cart is empty"
          description="Go back to the store and explore great games and offers."
        />
      )}
    </S.Wrapper>
  )
}

export default CartList
