import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Highlight from '.'

import * as S from './styles'

type SutProps = {
  floatImage?: string
  alignment?: 'right' | 'left'
}
const args = {
  title: 'Heading 1',
  subtitle: 'Heading 2',
  backgroundImage: '/img/red-dead-img.jpg',
  buttonLabel: 'Buy now',
  buttonLink: '/rdr2'
}

describe('<Highlight />', () => {
  const renderSut = (props?: SutProps): RenderResult =>
    renderWithTheme(<Highlight {...args} {...props} wrapperTestId="wrapper" />)

  it('should render headings and button', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /heading 1/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /heading 2/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute('href', '/rdr2')
  })

  it('should render background image', () => {
    renderSut()

    expect(screen.getByTestId('wrapper')).toHaveStyle({
      backgroundImage: `url(${args.backgroundImage})`
    })
  })

  it('should render float image', () => {
    renderSut({ floatImage: '/float-image.png' })

    expect(screen.getByRole('img', { name: args.title })).toHaveAttribute('src', '/float-image.png')
  })

  it('should render align right by default', () => {
    renderSut()

    expect(screen.getByTestId('wrapper')).toHaveStyleRule(
      'grid-template-areas',
      "'floatimage content'"
    )
    expect(screen.getByTestId('wrapper')).toHaveStyleRule('text-align', 'right', {
      modifier: `${S.Content}`
    })
  })

  it('should render align left when passed', () => {
    renderSut({ alignment: 'left' })

    expect(screen.getByTestId('wrapper')).toHaveStyleRule(
      'grid-template-areas',
      "'content floatimage'"
    )
    expect(screen.getByTestId('wrapper')).toHaveStyleRule('text-align', 'left', {
      modifier: `${S.Content}`
    })
  })
})
