import 'match-media-mock'
import GameCardSlider, { GameCardSliderProps } from '.'
import items from './mock'
import { render, screen } from 'utils/tests'

describe('<GameCardSlider />', () => {
  const renderSut = (props?: Pick<GameCardSliderProps, 'color'>) =>
    render(<GameCardSlider items={items} {...props} />)

  it('should render with 4 active items', () => {
    const { container } = renderSut()

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.slick-active')).toHaveLength(4)
  })

  it('should render white arros if color is passed', () => {
    renderSut({ color: 'white' })

    expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
    expect(screen.getByLabelText(/next games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
})
