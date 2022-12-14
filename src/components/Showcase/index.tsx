import { GameCardProps } from 'components/GameCard'
import GameCardSlider from 'components/GameCardSlider'
import Heading from 'components/Heading'
import Highlight, { HighlighProps } from 'components/Highlight'
import * as S from './styles'

export type ShowcaseProps = {
  title?: string
  highlight?: HighlighProps
  games?: GameCardProps[]
  color?: 'black' | 'white'
}

const Showcase = ({ title, highlight, games, color = 'white' }: ShowcaseProps) => (
  <S.Wrapper data-testid={title || 'showcase'}>
    {!!title && (
      <Heading lineLeft lineColor="secondary">
        {title}
      </Heading>
    )}
    {!!highlight && <Highlight {...highlight} />}
    {!!games && <GameCardSlider items={games} color={color} />}
  </S.Wrapper>
)

export default Showcase
