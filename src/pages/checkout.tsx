import protectedRoutes from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'
import Checkout from 'templates/Checkout'

export default function CheckoutPage() {
  return <Checkout />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
