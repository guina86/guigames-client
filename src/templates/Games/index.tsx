import { useQuery } from '@apollo/client'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined'
import { Container } from 'components/Container'
import Empty from 'components/Empty'
import ExploreSidebar, { Category, ExploreSidebarProps } from 'components/ExploreSidebar'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Grid } from 'components/Grid'
import Loading from 'components/Loading'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GET_GAMES } from 'graphql/queries/games'
import Base from 'templates/Base'
import { imageMapper } from 'utils/mappers'
import * as S from './styles'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  categories: Category[]
}

const Games = ({ categories }: GamesTemplateProps) => {
  const { data, loading } = useQuery<GetGames, GetGamesVariables>(GET_GAMES, {
    variables: {
      limit: 15
    }
  })

  const handleFilter = () => {}

  const handleShowMore = () => {}

  return (
    <Base>
      <Container>
        <S.Content>
          <ExploreSidebar categories={categories} onFilter={handleFilter} />
          {loading ? (
            <S.LoadingWrapper>
              <Loading />
            </S.LoadingWrapper>
          ) : (
            <section>
              <Grid>
                {data?.games.map((game) => (
                  <GameCard
                    key={game.slug}
                    title={game.name}
                    slug={game.slug}
                    developer={game.developers[0].name}
                    img={imageMapper(game.cover!.url)}
                    price={game.price}
                  />
                ))}
              </Grid>
              <S.ShowMore role="button" onClick={handleShowMore}>
                <p>Show More</p>
                <ArrowDown size={35} />
              </S.ShowMore>
            </section>
          )}
        </S.Content>
      </Container>
    </Base>
  )
}

export default Games
