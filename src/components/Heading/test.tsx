import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Heading, { HeadingProps } from '.'

describe('<Heading />', () => {
  const renderSut = (props?: Omit<HeadingProps, 'children'>): RenderResult =>
    renderWithTheme(<Heading {...props}>Gui Games</Heading>)

  it('should render a white heading by default', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /gui games/i })).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black heading when color is passed', () => {
    renderSut({ color: 'black' })

    expect(screen.getByRole('heading', { name: /gui games/i })).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a heading with a line to the left side', () => {
    renderSut({ lineLeft: true })

    expect(screen.getByRole('heading', { name: /gui games/i })).toHaveStyle({
      'border-left': '0.7rem solid #3CD3C1'
    })
  })

  it('should render a heading with a line at the bottom', () => {
    renderSut({ lineBottom: true })

    expect(screen.getByRole('heading', { name: /gui games/i })).toHaveStyleRule(
      'border-bottom',
      '0.5rem solid #F231A5',
      {
        modifier: '::after'
      }
    )
  })
})
