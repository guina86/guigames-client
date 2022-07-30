import { initializeApollo } from 'utils/apollo'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import { GetServerSidePropsContext } from 'next'
import Success, { SuccessTemplateProps } from 'templates/Success'

export default function SuccessPage(props: SuccessTemplateProps) {
  return <Success {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetRecommended>({ query: GET_RECOMMENDED })

  return {
    revalidate: 60 * 60,
    props: {
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(data.recommended?.section?.highlight)
    }
  }
}
