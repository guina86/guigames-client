/* eslint-disable testing-library/no-node-access */
import { RenderResult, screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import { Container } from '.'

describe('<Container />', () => {
  const renderSut = (): RenderResult =>
    renderWithTheme(
      <Container data-testid="container">
        <span>Lorem ipsum dolor sit amet.</span>
      </Container>
    )
  it('should render the heading', () => {
    renderSut()

    const container = screen.getByTestId('container')
    expect(container).toHaveStyleRule('max-width', theme.grid.container)
    expect(container).toMatchInlineSnapshot(`
      .c0 {
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
