import Profile from 'templates/Profile'
import OrderList, { OrderListProps } from 'components/OrderList'
import ordersMock from 'components/OrderList/mock'

export default function OrdersPage({ items }: OrderListProps) {
  return (
    <Profile>
      <OrderList items={items} />
    </Profile>
  )
}

export function getServerSideProps() {
  return {
    props: {
      items: ordersMock
    }
  }
}
