/* eslint-disable testing-library/no-node-access */
import { render, RenderResult, screen, within } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import Loading, { LoadingProps } from '.'

describe('<Loading />', () => {
  const renderSut = (props?: LoadingProps): RenderResult => renderWithTheme(<Loading {...props} />)

  it('should render the Loading with primary color', () => {
    renderSut()

    const loading = screen.getByLabelText(/loading indicator/i)

    expect(loading).toBeInTheDocument()
    expect(loading.firstChild).toHaveStyle({ background: theme.colors.primary })
  })

  it('should render the Loading with secondary color', () => {
    renderSut({ color: 'secondary' })

    const loading = screen.getByLabelText(/loading indicator/i)

    expect(loading).toBeInTheDocument()
    expect(loading.firstChild).toHaveStyle({ background: theme.colors.secondary })
  })
})
