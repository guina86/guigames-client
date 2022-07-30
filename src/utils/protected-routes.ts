import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { Session } from './apollo'

async function protectedRoutes(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session) {
    context.res.setHeader('Location', `/sign-in?callbackUrl=${context.resolvedUrl}`)
    context.res.statusCode = 302
  }

  return session as Session
}

export default protectedRoutes
