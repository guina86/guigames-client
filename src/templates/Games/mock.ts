import { GET_GAMES } from 'graphql/queries/games'

export const gamesMock = {
  request: {
    query: GET_GAMES,
    variables: { limit: 15, where: {} }
  },
  result: {
    data: {
      games: [
        {
          name: 'Sample Game',
          slug: 'sample-game',
          price: 215.0,
          developers: [{ name: 'sample developer' }],
          cover: {
            url: 'sample-game.jpg'
          },
          __typename: 'Game'
        }
      ],
      gamesConnection: {
        values: [{ id: '1' }, { id: '2' }],
        __typename: 'GamesConnection'
      }
    }
  }
}

export const noGamesMock = {
  request: {
    query: GET_GAMES,
    variables: { limit: 15, where: {} }
  },
  result: {
    data: {
      games: [],
      gamesConnection: {
        values: [],
        __typename: 'GamesConnection'
      }
    }
  }
}

export const fetchMoreMock = {
  request: {
    query: GET_GAMES,
    variables: { limit: 15, where: {}, start: 1 }
  },
  result: {
    data: {
      games: [
        {
          name: 'Fetch More Game',
          slug: 'fetch-more-game',
          price: 150.0,
          developers: [{ name: 'sample developer' }],
          cover: {
            url: 'sample-game.jpg'
          },
          __typename: 'Game'
        }
      ],
      gamesConnection: {
        values: [{ id: '1' }, { id: '2' }],
        __typename: 'GamesConnection'
      }
    }
  }
}
