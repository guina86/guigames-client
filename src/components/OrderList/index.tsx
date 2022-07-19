import Empty from 'components/Empty'
import GameItem, { GameItemProps } from 'components/GameItem'
import Heading from 'components/Heading'
import * as S from './styles'

export type OrderListProps = {
  items: GameItemProps[]
}

const OrderList = ({ items = [] }: OrderListProps) => (
  <S.Wrapper>
    <Heading size="small" color="black" lineBottom>
      My orders
    </Heading>
    {items.length > 0 ? (
      items.map((item) => <GameItem key={item.downloadLink} {...item} />)
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
