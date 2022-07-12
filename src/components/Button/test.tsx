import { AddShoppingCart } from '@styled-icons/material-outlined'
import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Button, { ButtonProps } from '.'

describe('<Button />', () => {
  const renderSut = (args?: ButtonProps): RenderResult =>
    renderWithTheme(<Button {...args}>Buy now</Button>)

  it('should render medium size by default', () => {
    const { container } = renderSut()

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 3.2rem',
      'font-size': '1.4rem'
    })
    expect(container).toMatchSnapshot()
  })

  it('should render small size when passed ', () => {
    renderSut({ size: 'small' })

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyle({
      height: '3rem',
      padding: '0.8rem 1rem',
      'font-size': '1.2rem'
    })
  })

  it('should render large size when passed ', () => {
    renderSut({ size: 'large' })

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 4.8rem',
      'font-size': '1.6rem'
    })
  })

  it('should render with full width when passed ', () => {
    renderSut({ fullWidth: true })

    expect(screen.getByRole('button', { name: /buy now/i })).toHaveStyle({
      width: '100%'
    })
  })

  it('should render an icon when passed', () => {
    renderSut({ icon: <AddShoppingCart data-testid="icon" /> })

    expect(screen.getByText(/buy now/i)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render a minimal version', () => {
    renderSut({ icon: <AddShoppingCart data-testid="icon" />, minimal: true })

    const button = screen.getByRole('button', { name: /buy now/i })

    expect(button).toHaveStyle({
      background: 'none',
      color: '#F231A5'
    })
    expect(button).toHaveStyleRule('background', 'none', { modifier: ':hover' })
  })

  it('should render button as a link', () => {
    renderSut({ as: 'a', href: '/link' })

    expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute('href', '/link')
  })
})
