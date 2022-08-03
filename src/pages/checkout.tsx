import { GetServerSidePropsContext } from 'next'
import Checkout, { CheckoutTemplateProps } from 'templates/Checkout'
import protectedRoutes from 'utils/protected-routes'

export default function CheckoutPage(props: CheckoutTemplateProps) {
  return <Checkout {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}
