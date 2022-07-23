import Games, { GamesTemplateProps } from 'templates/Games'
import categoriesMock from 'components/ExploreSidebar/mock'
import { initializeApollo } from 'utils/apollo'
import { GET_GAMES } from 'graphql/queries/games'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 15 }
  })
  return {
    props: {
      revalidate: 60,
      initialApolloState: apolloClient.cache.extract(),
      categories: categoriesMock
    }
  }
}
