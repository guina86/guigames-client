import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined'
import { Container } from 'components/Container'
import Empty from 'components/Empty'
import ExploreSidebar, { Category, ExploreSidebarProps } from 'components/ExploreSidebar'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Grid } from 'components/Grid'
import Base from 'templates/Base'
import * as S from './styles'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  categories: Category[]
}

const Games = ({ categories, games = [] }: GamesTemplateProps) => {
  const handleFilter = () => {}

  const handleShowMore = () => {}

  return (
    <Base>
      <Container>
        <S.Content>
          <ExploreSidebar categories={categories} onFilter={handleFilter} />
          {games.length > 0 ? (
            <section>
              <Grid>
                {games.map((game, index) => (
                  <GameCard key={`games-${index}`} {...game} />
                ))}
              </Grid>
              <S.ShowMore role="button" onClick={handleShowMore}>
                <p>Show More</p>
                <ArrowDown size={35} />
              </S.ShowMore>
            </section>
          ) : (
            <Empty
              title="No games match your search"
              description="Try diferent filter options to find the game you want"
            />
          )}
        </S.Content>
      </Container>
    </Base>
  )
}

export default Games
