import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Banner from '.'

type SutProps = {
  ribbon: string
  ribbonSize: 'small' | 'normal'
  ribbonColor: 'primary' | 'secondary'
}

describe('<Banner />', () => {
  const args = {
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391730/header.jpg',
    title: 'Defy death',
    subtitle: '<p>Play the new <strong>CrashLands</strong> season',
    buttonLabel: 'Buy now',
    buttonLink: '/games/defy-death'
  }
  const renderSut = (props?: SutProps): RenderResult =>
    renderWithTheme(<Banner {...args} {...props} />)

  it('should render the banner', () => {
    const { container } = renderSut()

    expect(screen.getByRole('img', { name: /defy death/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /defy death/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /play the new crashlands season/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should render a Ribbon', () => {
    renderSut({ ribbon: 'My Ribbon', ribbonSize: 'small', ribbonColor: 'secondary' })

    const ribbon = screen.getByText(/my ribbon/i)
    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({
      backgroundColor: '#3CD3C1',
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
