import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getStaticProps() {
  return {
    props: {
      games: [],
      recommendedGames: gamesMock,
      recommendedHighlight: highlightMock
    }
  }
}
