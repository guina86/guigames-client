import Profile from 'templates/Profile'
import OrderList, { OrderListProps } from 'components/OrderList'
import ordersMock from 'components/OrderList/mock'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'

export default function OrdersPage({ items }: OrderListProps) {
  return (
    <Profile>
      <OrderList items={items} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session,
      items: ordersMock
    }
  }
}
