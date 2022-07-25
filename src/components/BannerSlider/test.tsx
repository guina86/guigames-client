/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import 'match-media-mock'
import { render, screen } from 'utils/tests'
import BannerSlider from '.'
import items from './mock'

describe('<BannerSlider />', () => {
  const renderSut = () => render(<BannerSlider items={items} />)

  it('should render vertical slider', () => {
    const { container } = renderSut()

    expect(container.querySelector('.slick-vertical')).toBeInTheDocument()
  })

  it('should render with 1 active item', () => {
    const { container } = renderSut()

    expect(container.querySelectorAll('.slick-slide')).toHaveLength(3)
    expect(container.querySelectorAll('li.slick-active')).toHaveLength(1)
    expect(container.querySelector('.slick-dots')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /defy death 1/i, hidden: false })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /defy death 2/i, hidden: true })).toBeInTheDocument()
  })
})
