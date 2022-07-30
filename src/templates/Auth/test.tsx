import { render, screen } from 'utils/tests'
import Auth from '.'

describe('<Auth />', () => {
  const renderSut = () =>
    render(
      <Auth title="Auth Title">
        <input type="text" />
      </Auth>
    )

  it('should render all components and children', () => {
    renderSut()

    expect(screen.getAllByRole('img', { name: /gui games/i })).toHaveLength(3)
    expect(
      screen.getByRole('heading', { name: /all your favorite games in on place/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Gui games is the best and most complete gaming platform./i
      })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /auth title/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
