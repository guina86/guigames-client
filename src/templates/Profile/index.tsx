import { Container } from 'components/Container'
import Heading from 'components/Heading'
import ProfileMenu from 'components/ProfileMenu'
import { useRouter } from 'next/router'
import Base from 'templates/Base'
import * as S from './styles'

export type ProfileTemplateProps = {
  children: React.ReactNode
}

const Profile = ({ children }: ProfileTemplateProps) => {
  const { asPath } = useRouter()
  return (
    <Base>
      <Container>
        <Heading lineColor="secondary" lineLeft>
          My Account
        </Heading>
        <S.Main>
          <ProfileMenu activeLink={asPath} />
          <S.Content>{children}</S.Content>
        </S.Main>
      </Container>
    </Base>
  )
}

export default Profile
