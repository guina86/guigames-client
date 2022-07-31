import Games, { GamesTemplateProps } from 'templates/Games'
import { initializeApollo } from 'utils/apollo'
import { GET_GAMES } from 'graphql/queries/games'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'

import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'
import { GetServerSidePropsContext } from 'next'
import { categoriesFields, platformsFields, priceFields, sortFields } from 'utils/filter/fields'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()

  const filterPrice = {
    title: 'Price',
    name: 'price_lte',
    type: 'radio',
    fields: priceFields
  }

  const filterPlatforms = {
    title: 'Platforms',
    name: 'platforms',
    type: 'checkbox',
    fields: platformsFields
  }

  const filterSort = {
    title: 'Sort by price',
    name: 'sort',
    type: 'radio',
    fields: sortFields
  }

  const filterCategories = {
    title: 'Genres',
    name: 'categories',
    type: 'checkbox',
    fields: categoriesFields
  }

  const filterItems = [filterSort, filterPrice, filterPlatforms, filterCategories]

  await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      filterItems: filterItems
    }
  }
}
