/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Logo, { LogoProps } from '.'

describe('<Logo />', () => {
  const renderSut = (props?: LogoProps): RenderResult =>
    renderWithTheme(<Logo wrapperTestId="logo-wrapper" {...props} />)

  it('should render a white label by default', () => {
    const { container } = renderSut({ id: 'my_id' })

    expect(container.querySelector('#gradient_my_id')).toBeInTheDocument()
  })

  it('should render a white label by default', () => {
    renderSut()

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black label when color is passed', () => {
    renderSut({ color: 'black' })

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render bigger logo', () => {
    renderSut({ size: 'large' })

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      width: '30rem'
    })
  })

  it('should render a normal logo when size is default', () => {
    renderSut()

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      width: '17rem'
    })
  })

  it('should render a a bigger logo without text on if hidenOnMobile', () => {
    renderSut({ hideOnMobile: true })

    expect(screen.getByTestId('logo-wrapper')).toHaveStyleRule('width', '5.8rem', {
      media: '(max-width: 768px)'
    })
  })
})
