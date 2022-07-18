import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import CartList from '.'
import itemsMock from './mock'

describe('<CartList />', () => {
  const renderSut = (): RenderResult =>
    renderWithTheme(<CartList items={itemsMock} total="R$ 430,00" />)

  it('should render the heading', () => {
    const { container } = renderSut()

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 430,00')).toHaveStyle({ color: '#F231A5' })

    expect(container).toMatchSnapshot()
  })
})
