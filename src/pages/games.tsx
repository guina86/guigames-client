import Games, { GamesTemplateProps } from 'templates/Games'
import categoriesMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getServerSideProps() {
  return {
    props: {
      games: gamesMock,
      categories: categoriesMock
    }
  }
}
