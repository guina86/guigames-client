import { InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

export const makeApolloCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          games: concatPagination(['where', 'sort'])
        }
      }
    }
  })
