import { render, screen } from 'utils/tests'
import Highlight, { HighlighProps } from '.'
import * as S from './styles'
import highlighMock from './mock'

describe('<Highlight />', () => {
  const renderSut = (props?: Partial<HighlighProps>) =>
    render(<Highlight {...highlighMock} {...props} />)

  it('should render headings and button', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /red dead is back/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /come see john´s new adventures/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute('href', '/rdr2')
  })

  it('should render background image', () => {
    renderSut()

    expect(screen.getByRole('img', { name: /background red dead is back/i })).toHaveAttribute(
      'src',
      highlighMock.backgroundImage
    )
  })

  it('should render float image', () => {
    renderSut({ floatImage: '/float-image.png' })

    expect(screen.getByRole('img', { name: highlighMock.title })).toHaveAttribute(
      'src',
      '/float-image.png'
    )
  })

  it('should render align right by default', () => {
    renderSut()

    expect(screen.getByTestId('highlight')).toHaveStyleRule(
      'grid-template-areas',
      "'floatimage content'"
    )
    expect(screen.getByTestId('highlight')).toHaveStyleRule('text-align', 'right', {
      modifier: `${S.Content}`
    })
  })

  it('should render align left when passed', () => {
    renderSut({ alignment: 'left' })

    expect(screen.getByTestId('highlight')).toHaveStyleRule(
      'grid-template-areas',
      "'content floatimage'"
    )
    expect(screen.getByTestId('highlight')).toHaveStyleRule('text-align', 'left', {
      modifier: `${S.Content}`
    })
  })
})
