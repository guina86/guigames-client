import { render, screen } from '@testing-library/react'

import Main from '.'

describe('<Main />', () => {
  it('should render the heading', () => {
    render(<Main />)

    expect(
      screen.getByRole('heading', { name: /next.js project boilerplate/i })
    ).toBeInTheDocument()
  })

  it('should render correctly', () => {
    const { container } = render(<Main />)

    expect(container).toMatchSnapshot()
  })

  it('should render the colors correctly', () => {
    render(<Main />)

    expect(screen.getByRole('main')).toHaveStyle({
      'background-color': '#06092b'
    })
  })
})
