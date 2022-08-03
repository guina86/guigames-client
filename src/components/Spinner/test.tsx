import { render, screen } from 'utils/tests'
import Spinner from '.'

describe('<Spinner />', () => {
  const renderSut = () => render(<Spinner />)

  it('Should render correctly', () => {
    renderSut()

    expect(screen.getByTitle(/loading/i)).toBeInTheDocument()
  })
})
