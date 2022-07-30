import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'
import Checkout, { CheckoutTemplateProps } from 'templates/Checkout'

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
