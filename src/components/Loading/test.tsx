/* eslint-disable testing-library/no-node-access */
import theme from 'styles/theme'
import { render, screen } from 'utils/tests'

import Loading, { LoadingProps } from '.'

describe('<Loading />', () => {
  const renderSut = (props?: LoadingProps) => render(<Loading {...props} />)

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
