import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Banner from '.'

describe('<Banner />', () => {
  const args = {
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391730/header.jpg',
    title: 'Defy death',
    subtitle: '<p>Play the new <strong>CrashLands</strong> season',
    buttonLabel: 'Buy now',
    buttonLink: '/games/defy-death'
  }
  const renderSut = (): RenderResult => renderWithTheme(<Banner {...args} />)

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
})
