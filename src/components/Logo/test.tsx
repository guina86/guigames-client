/* eslint-disable testing-library/no-container */
import { render, screen } from 'utils/tests'
import Logo, { LogoProps } from '.'

describe('<Logo />', () => {
  const renderSut = (props?: LogoProps) => render(<Logo {...props} />)

  it('should render a white label by default', () => {
    const { container } = renderSut({ id: 'my_id' })

    expect(container.querySelector('#gradient_my_id')).toBeInTheDocument()
  })

  it('should render a white label by default', () => {
    renderSut()

    expect(screen.getByTestId('wrapper')).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black label when color is passed', () => {
    renderSut({ color: 'black' })

    expect(screen.getByTestId('wrapper')).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render bigger logo', () => {
    renderSut({ size: 'large' })

    expect(screen.getByTestId('wrapper')).toHaveStyle({
      width: '30rem'
    })
  })

  it('should render a normal logo when size is default', () => {
    renderSut()

    expect(screen.getByTestId('wrapper')).toHaveStyle({
      width: '17rem'
    })
  })

  it('should render a a bigger logo without text on if hidenOnMobile', () => {
    renderSut({ hideOnMobile: true })

    expect(screen.getByTestId('wrapper')).toHaveStyleRule('width', '5.8rem', {
      media: '(max-width: 768px)'
    })
  })
})
