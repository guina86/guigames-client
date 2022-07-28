import Cart, { CartTemplateProps } from 'templates/Cart'
import { initializeApollo } from 'utils/apollo'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<GetRecommended>({ query: GET_RECOMMENDED })

  return {
    props: {
      session,
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(data.recommended?.section?.highlight)
    }
  }
}
