import { GetServerSidePropsContext } from 'next'
import Cart, { CartTemplateProps } from 'templates/Cart'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { initializeApollo } from 'utils/apollo'
import { gamesMapper, highlightMapper } from 'utils/mappers'

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetRecommended>({ query: GET_RECOMMENDED })

  return {
    props: {
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(data.recommended?.section?.highlight)
    }
  }
}
