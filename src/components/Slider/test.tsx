/* eslint-disable testing-library/no-node-access */
import 'match-media-mock'
import { render, RenderResult, screen } from '@testing-library/react'

import Slider from '.'

describe('<Slider />', () => {
  const renderSut = (): RenderResult =>
    render(
      <Slider settings={{ slidesToShow: 1, infinite: false }}>
        <p>Item 1</p>
        <p>Item 2</p>
      </Slider>
    )
  it('should render children as slider item', () => {
    const { container } = renderSut()

    expect(screen.getByText(/item 1/i).parentElement?.parentElement).toHaveClass('slick-slide')
    expect(screen.getByText(/item 2/i).parentElement?.parentElement).toHaveClass('slick-slide')

    expect(container.firstChild).toMatchSnapshot()
  })
})
