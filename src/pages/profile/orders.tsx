import { GetServerSidePropsContext } from 'next'
import Profile from 'templates/Profile'
import OrderList, { OrderListProps } from 'components/OrderList'
import { GetOrders, GetOrdersVariables } from 'graphql/generated/GetOrders'
import { GET_ORDERS } from 'graphql/queries/orders'
import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'
import { ordersMapper } from 'utils/mappers'

export default function OrdersPage({ items }: OrderListProps) {
  return (
    <Profile>
      <OrderList items={items} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) return { props: {} }

  const { data } = await apolloClient.query<GetOrders, GetOrdersVariables>({
    query: GET_ORDERS,
    variables: {
      identifier: session?.id as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      session,
      items: ordersMapper(data.orders)
    }
  }
}
