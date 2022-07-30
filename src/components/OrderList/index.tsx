import Empty from 'components/Empty'
import GameItem, { GameItemProps, PaymentInfoProps } from 'components/GameItem'
import Heading from 'components/Heading'
import * as S from './styles'

type OrderProps = {
  id: string
  paymentInfo: PaymentInfoProps
  games: GameItemProps[]
}

export type OrderListProps = {
  items: OrderProps[]
}

const OrderList = ({ items = [] }: OrderListProps) => (
  <S.Wrapper>
    <Heading size="small" color="black" lineBottom>
      My orders
    </Heading>
    {items.length > 0 ? (
      items.map((order) => {
        return order.games.map((game) => (
          <GameItem key={`${order.id}_${game.id}`} {...game} paymentInfo={order.paymentInfo} />
        ))
      })
    ) : (
      <Empty
        title="You have no orders yet"
        description="Go back to the store and explore greate games and offers"
        hasLink
      />
    )}
  </S.Wrapper>
)

export default OrderList
