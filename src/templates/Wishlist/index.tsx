import Base from 'templates/Base'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import Empty from 'components/Empty'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Grid } from 'components/Grid'
import Heading from 'components/Heading'
import { HighlighProps } from 'components/Highlight'
import Loading from 'components/Loading'
import Showcase from 'components/Showcase'
import { useWishlist } from 'hooks/use-wishlist'
import * as S from './styles'

export type WishlistTemplateProps = {
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlighProps
}

const Wishlist = ({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: WishlistTemplateProps) => {
  const { items, loading } = useWishlist()

  return (
    <Base>
      <Container data-testid="wishlist">
        <Heading lineColor="secondary" lineLeft>
          Wishlist
        </Heading>

        {loading ? (
          <S.Loading>
            <Loading />
          </S.Loading>
        ) : items.length > 0 ? (
          <Grid>
            {items?.map((game, index) => (
              <GameCard key={`wishlist-${index}`} {...game} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wishlist will appear here"
            hasLink
          />
        )}

        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default Wishlist
