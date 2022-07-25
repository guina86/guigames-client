import { render, screen } from 'utils/tests'
import Ribbon, { RibbonProps } from '.'

describe('<Ribbon />', () => {
  const renderSut = (props?: Omit<RibbonProps, 'children'>) =>
    render(<Ribbon {...props}>Best Seller</Ribbon>)

  it('should render the text correctly', () => {
    renderSut()

    expect(screen.getByText(/best seller/i)).toBeInTheDocument()
  })

  it('should render with primary color', () => {
    renderSut()

    expect(screen.getByText(/best seller/i)).toHaveStyle({ backgroundColor: '#F231A5' })
  })

  it('should render with secondary color', () => {
    renderSut({ color: 'secondary' })

    expect(screen.getByText(/best seller/i)).toHaveStyle({ backgroundColor: '#3CD3C1' })
  })

  it('should render normal size as default', () => {
    renderSut()

    expect(screen.getByText(/best seller/i)).toHaveStyle({ height: '3.6rem', fontSize: '1.4rem' })
  })

  it('should render small size when passed', () => {
    renderSut({ size: 'small', color: 'primary' })

    expect(screen.getByText(/best seller/i)).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
  })
})
