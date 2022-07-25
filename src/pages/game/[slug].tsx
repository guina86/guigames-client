import Game, { GameTemplateProps } from 'templates/Game'
import galleryMock from 'components/Gallery/mock'
import gameDetailsMock from 'components/GameDetails/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import { useRouter } from 'next/router'
import { initializeApollo } from 'utils/apollo'
import { GET_GAMES, GET_GAME_BY_SLUG } from 'graphql/queries/games'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GetGameBySlug, GetGameBySlugVariables } from 'graphql/generated/GetGameBySlug'
import { GetStaticProps } from 'next'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper, imageMapper } from 'utils/mappers'
import { GetUpcoming } from 'graphql/generated/GetUpcoming'
import { GET_UPCOMING } from 'graphql/queries/upcomming'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <Game {...props} />
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 9 }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get game data
  const {
    data: { games }
  } = await apolloClient.query<GetGameBySlug, GetGameBySlugVariables>({
    query: GET_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  })
  if (games.length === 0) {
    return { notFound: true }
  }
  const game = games[0]

  // Get recommended data
  const {
    data: { recommended }
  } = await apolloClient.query<GetRecommended>({ query: GET_RECOMMENDED })

  // Get upcoming data
  const TODAY = new Date().toISOString().slice(0, 10)
  const {
    data: { showcase, upcomingGames }
  } = await apolloClient.query<GetUpcoming>({ query: GET_UPCOMING, variables: { date: TODAY } })
  return {
    revalidate: 60,
    props: {
      cover: imageMapper(game.cover?.src),
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((img) => ({
        src: imageMapper(img.src),
        label: img.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: showcase?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighlight: highlightMapper(showcase?.upcomingGames?.highlight),
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games)
    }
  }
}
