import { gql } from '@apollo/client'

export const GameFragment = gql`
  fragment GameFragment on Game {
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
