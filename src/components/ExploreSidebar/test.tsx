import { RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { css } from 'styled-components'
import { renderWithTheme } from 'utils/tests/helpers'
import ExploreSidebar, { ExploreSidebarProps } from '.'
import categoriesMock from './mock'
import { Overlay } from './styles'

describe('<ExploreSidebar />', () => {
  const renderSut = (props?: Partial<ExploreSidebarProps>): RenderResult =>
    renderWithTheme(<ExploreSidebar filterItems={categoriesMock} onFilter={jest.fn} {...props} />)

  it('should render the sidebar', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sort by/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /platforms/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument()

    expect(screen.getByRole('checkbox', { name: /under \$50/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /low to high/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /action/i })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /filter/i }))
  })

  it('should check initial values passed', () => {
    renderSut({ initialValues: { platforms: ['windows'], sort_by: 'high-to-low' } })

    expect(screen.getByRole('radio', { name: /high to low/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked()
  })

  it('should return initial values onFilter', async () => {
    const onFilter = jest.fn()
    renderSut({ onFilter, initialValues: { platforms: ['windows'], sort_by: 'low-to-high' } })

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith({ platforms: ['windows'], sort_by: 'low-to-high' })
    })
  })

  it('should return new selected values onFilter', async () => {
    const onFilter = jest.fn()
    renderSut({ onFilter })

    userEvent.click(screen.getByRole('radio', { name: /high to low/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /windows/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /action/i }))

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledTimes(5)
    })
    expect(onFilter).toHaveBeenCalledWith({
      platforms: ['linux', 'windows'],
      sort_by: 'high-to-low',
      genre: ['action']
    })
  })

  it('should return new selected and re-selected values onFilter', async () => {
    const onFilter = jest.fn()
    renderSut({ onFilter })

    userEvent.click(screen.getByRole('radio', { name: /high to low/i }))
    userEvent.click(screen.getByRole('radio', { name: /low to high/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith({ platforms: [], sort_by: 'low-to-high' })
    })
  })
})
