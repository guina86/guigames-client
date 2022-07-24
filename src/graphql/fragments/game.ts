import { gql } from '@apollo/client'

export const GameFragment = gql`
  fragment GameFragment on Game {
    id
    slug
    name
    cover {
      url
    }
    developers {
      name
    }
    price
  }
`
