import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Footer from '.'

describe('<Footer />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<Footer contentTestId="content" />)

  it('should render the footer', () => {
    const { container } = renderSut()

    expect(screen.getByLabelText(/gui games/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /follow us/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /links/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /location/i })).toBeInTheDocument()
    expect(screen.getByText(/gui games 2022 © all rights reserved/i)).toBeInTheDocument()
    expect(screen.getByTestId('content')).toHaveStyle({
      'grid-template-columns': 'repeat(2,1fr)'
    })
    expect(screen.getByTestId('content')).toHaveStyleRule(
      'grid-template-columns',
      'repeat(4,1fr)',
      {
        media: '(min-width: 768px)'
      }
    )

    expect(container).toMatchSnapshot()
  })
})
