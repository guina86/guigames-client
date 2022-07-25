import { render, screen } from 'utils/tests'
import MediaMatch from '.'

describe('<MediaMatch />', () => {
  const renderSut = () =>
    render(
      <>
        <MediaMatch data-testid="desktop" greaterThan="medium">
          <h1>Desktop</h1>
        </MediaMatch>
        <MediaMatch data-testid="mobile" lessThan="medium">
          <h1>Desktop</h1>
        </MediaMatch>
      </>
    )

  it('should be hidden if no media query is passed', () => {
    renderSut()

    expect(screen.getByTestId('desktop')).toHaveStyleRule('display', 'none')
    expect(screen.getByTestId('mobile')).toHaveStyleRule('display', 'none')
  })

  it('should be show or hide based on the media passed', () => {
    renderSut()

    expect(screen.getByTestId('desktop')).toHaveStyleRule('display', 'block', {
      media: '(min-width: 768px)'
    })
    expect(screen.getByTestId('mobile')).toHaveStyleRule('display', 'block', {
      media: '(max-width: 768px)'
    })
  })
})
