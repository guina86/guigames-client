import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import 'jest-styled-components'

import Logo from '.'

describe('<Logo />', () => {
  it('should render a white label by default', () => {
    renderWithTheme(<Logo />)

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black label when color is passed', () => {
    renderWithTheme(<Logo color="black" />)

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render bigger logo', () => {
    renderWithTheme(<Logo color="black" size="large" />)

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      width: '30rem'
    })
  })

  it('should render a normal logo when size is default', () => {
    renderWithTheme(<Logo color="black" />)

    expect(screen.getByTestId('logo-wrapper')).toHaveStyle({
      width: '17rem'
    })
  })

  it('should render a a bigger logo without text on if hidenOnMobile', () => {
    renderWithTheme(<Logo color="black" hideOnMobile />)

    expect(screen.getByTestId('logo-wrapper')).toHaveStyleRule(
      'width',
      '5.8rem',
      { media: '(max-width: 768px)' }
    )
  })
})
