import { GetServerSidePropsContext } from 'next'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { GET_WISHLIST } from 'graphql/queries/wishlist'
import { GetWishlist, GetWishlistVariables } from 'graphql/generated/GetWishlist'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { initializeApollo } from 'utils/apollo'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protected-routes'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) return { props: {} }

  await apolloClient.query<GetWishlist, GetWishlistVariables>({
    query: GET_WISHLIST,
    variables: {
      identifier: session?.user?.email as string
    }
  })

  const { data } = await apolloClient.query<GetRecommended>({ query: GET_RECOMMENDED })

  return {
    props: {
      session,
      initialApolloState: apolloClient.cache.extract(),
      games: [],
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(data.recommended?.section?.highlight)
    }
  }
}
