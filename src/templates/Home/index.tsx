import { BannerProps } from 'components/Banner'
import BannerSlider from 'components/BannerSlider'
import { Container } from 'components/Container'
import Footer from 'components/Footer'
import { GameCardProps } from 'components/GameCard'
import { HighlighProps } from 'components/Highlight'
import Menu from 'components/Menu'
import Showcase from 'components/Showcase'
import * as S from './styles'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newsGames: GameCardProps[]
  mostPopularHighlight: HighlighProps
  mostPopularGames: GameCardProps[]
  upcomingGames: GameCardProps[]
  upcomingHighlight: HighlighProps
  upcomingMoreGames: GameCardProps[]
  freeGames: GameCardProps[]
  freeHighlight: HighlighProps
}

const Home = ({
  banners,
  newsGames,
  mostPopularGames,
  mostPopularHighlight,
  upcomingGames,
  upcomingHighlight,
  upcomingMoreGames,
  freeGames,
  freeHighlight
}: HomeTemplateProps) => (
  <section>
    <Container>
      <Menu />
      <S.SectionBanner>
        <BannerSlider items={banners} />
      </S.SectionBanner>
    </Container>

    <S.SectionNews>
      <Showcase title="News" games={newsGames} color="black" />
    </S.SectionNews>

    <Showcase title="Most Popular" highlight={mostPopularHighlight} games={mostPopularGames} />

    <S.SectionUpcoming>
      <Showcase title="Upcoming" games={upcomingGames} />
      <Showcase highlight={upcomingHighlight} games={upcomingMoreGames} />
    </S.SectionUpcoming>

    <Showcase title="Free Games" highlight={freeHighlight} games={freeGames} />

    <S.SectionFooter>
      <Container>
        <Footer />
      </Container>
    </S.SectionFooter>
  </section>
)

export default Home
