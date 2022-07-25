/* eslint-disable testing-library/no-node-access */
import { render, screen } from 'utils/tests'
import { Container } from '.'

describe('<Container />', () => {
  const renderSut = () =>
    render(
      <Container data-testid="container">
        <span>Lorem ipsum dolor sit amet.</span>
      </Container>
    )
  it('should render the Container', () => {
    renderSut()

    const container = screen.getByTestId('container')
    expect(container).toHaveStyleRule('max-width', '130rem')
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        width: 100%;
        max-width: 130rem;
        margin-left: auto;
        margin-right: auto;
        padding-left: calc(3.2rem / 2);
        padding-right: calc(3.2rem / 2);
      }

      <div
        class="c0"
        data-testid="container"
      >
        <span>
          Lorem ipsum dolor sit amet.
        </span>
      </div>
    `)
  })
})
