import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined'
import Base from 'templates/Base'
import { Container } from 'components/Container'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard from 'components/GameCard'
import { Grid } from 'components/Grid'
import Loading from 'components/Loading'
import Empty from 'components/Empty'
import { useQueryGames } from 'graphql/queries/games'
import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'
import { getImageUrl } from 'utils/getImageUrl'
import * as S from './styles'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const Games = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()

  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })

  const hasMoreGames = (data?.games.length || 0) < (data?.gamesConnection?.values?.length || 0)

  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({
      pathname: '/games',
      query: items
    })
  }

  const handleShowMore = () => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } })
  }

  return (
    <Base>
      <Container>
        <S.Content>
          <ExploreSidebar
            filterItems={filterItems}
            onFilter={handleFilter}
            initialValues={parseQueryStringToFilter({ queryString: query, filterItems })}
          />
          <section>
            {data?.games.length ? (
              <>
                <Grid>
                  {data?.games.map((game) => (
                    <GameCard
                      id={game.id}
                      key={game.slug}
                      title={game.name}
                      slug={game.slug}
                      developer={game.developers[0].name}
                      img={getImageUrl(game.cover!.url)}
                      price={game.price}
                    />
                  ))}
                </Grid>
                {hasMoreGames && (
                  <S.ShowMore>
                    {loading ? (
                      <Loading />
                    ) : (
                      <S.ShowMoreButton role="button" onClick={handleShowMore}>
                        <p>Show More</p>
                        <ArrowDown size={35} />
                      </S.ShowMoreButton>
                    )}
                  </S.ShowMore>
                )}
              </>
            ) : (
              <Empty title=":(" description="We didn??t find any games with this filter" />
            )}
          </section>
        </S.Content>
      </Container>
    </Base>
  )
}

export default Games
