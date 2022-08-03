import { GetServerSidePropsContext } from 'next'
import FormProfile, { FormProfileProps } from 'components/FormProfile'
import { GetProfileMe, GetProfileMeVariables } from 'graphql/generated/GetProfileMe'
import { GET_PROFILE_ME } from 'graphql/queries/profile'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'
import Profile from 'templates/Profile'

export default function MePage(props: FormProfileProps) {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) return { props: {} }

  const { data } = await apolloClient.query<GetProfileMe, GetProfileMeVariables>({
    query: GET_PROFILE_ME,
    variables: {
      identifier: session?.id as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: { session, username: data.user?.username, email: data.user?.email }
  }
}
