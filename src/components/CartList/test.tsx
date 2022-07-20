import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import CartList, { CartListProps } from '.'
import itemsMock from './mock'

describe('<CartList />', () => {
  const renderSut = (props?: Partial<CartListProps>): RenderResult =>
    renderWithTheme(<CartList items={itemsMock} total="R$ 430,00" {...props} />)

  it('should render the heading', () => {
    const { container } = renderSut()

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 430,00')).toHaveStyle({ color: '#F231A5' })

    expect(container).toMatchSnapshot()
  })

  it('should render the button', () => {
    renderSut({ hasButton: true })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })
})
