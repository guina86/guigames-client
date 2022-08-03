import Base from 'templates/Base'
import { BannerProps } from 'components/Banner'
import BannerSlider from 'components/BannerSlider'
import { Container } from 'components/Container'
import { GameCardProps } from 'components/GameCard'
import { HighlighProps } from 'components/Highlight'
import Showcase from 'components/Showcase'
import * as S from './styles'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newGamesTitle: string
  newGames: GameCardProps[]
  mostPopularGamesTitle: string
  mostPopularHighlight: HighlighProps
  mostPopularGames: GameCardProps[]
  upcomingGamesTitle: string
  upcomingHighlight: HighlighProps
  upcomingGames: GameCardProps[]
  freeGamesTitle: string
  freeGames: GameCardProps[]
  freeHighlight: HighlighProps
}

const Home = ({
  banners,
  newGames,
  newGamesTitle,
  mostPopularGamesTitle,
  mostPopularGames,
  mostPopularHighlight,
  upcomingGamesTitle,
  upcomingGames,
  upcomingHighlight,
  freeGamesTitle,
  freeGames,
  freeHighlight
}: HomeTemplateProps) => (
  <Base>
    <Container>
      <S.SectionBanner>
        <BannerSlider items={banners} />
      </S.SectionBanner>
    </Container>

    <S.SectionNews>
      <Showcase title={newGamesTitle} games={newGames} color="black" />
    </S.SectionNews>

    <Showcase
      title={mostPopularGamesTitle}
      highlight={mostPopularHighlight}
      games={mostPopularGames}
    />

    <Showcase title={upcomingGamesTitle} highlight={upcomingHighlight} games={upcomingGames} />

    <Showcase title={freeGamesTitle} highlight={freeHighlight} games={freeGames} />
  </Base>
)

export default Home
