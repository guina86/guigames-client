import { render, RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import CartDropdown from '.'
import itemsMock from 'components/CartList/mock'

describe('<CartDropdown />', () => {
  const renderSut = (): RenderResult =>
    renderWithTheme(<CartDropdown items={itemsMock} total="R$ 430,00" />)

  it('should render CartIcon', () => {
    renderSut()

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${itemsMock.length}`))

    expect(screen.getByText('R$ 430,00'))
    expect(screen.getByText('Red Dead Redemption 2'))
    expect(screen.getByText('Borderlands 3'))
  })
})
