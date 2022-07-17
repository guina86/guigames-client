import { RenderResult } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import { Grid } from '.'

describe('<Grid />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<Grid />)

  it('should render the heading', () => {
    const { container } = renderSut()

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(25rem,1fr));
        grid-gap: 3.2rem;
        margin: 3.2rem 0;
      }

      <div>
        <div
          class="c0"
        />
      </div>
    `)
  })
})
