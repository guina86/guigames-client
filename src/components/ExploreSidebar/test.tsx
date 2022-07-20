/* eslint-disable testing-library/no-node-access */
import { RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { css } from 'styled-components'
import { renderWithTheme } from 'utils/tests/helpers'
import ExploreSidebar, { ExploreSidebarProps } from '.'
import categoriesMock from './mock'
import { Overlay } from './styles'

describe('<ExploreSidebar />', () => {
  const renderSut = (props?: Partial<ExploreSidebarProps>): RenderResult =>
    renderWithTheme(<ExploreSidebar categories={categoriesMock} onFilter={jest.fn} {...props} />)

  it('should render the sidebar', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sort by/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /system/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument()

    expect(screen.getByRole('checkbox', { name: /under \$50/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /low to high/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /action/i })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /filtrar/i }))
  })

  it('should check initial values passed', () => {
    renderSut({ initialValues: { windows: true, sort_by: 'high-to-low' } })

    expect(screen.getByRole('radio', { name: /high to low/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked()
  })

  it('should return initial values onFilter', async () => {
    const onFilter = jest.fn()
    renderSut({ onFilter, initialValues: { windows: true, sort_by: 'low-to-high' } })

    userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith({ windows: true, sort_by: 'low-to-high' })
    })
  })

  it('should return new selected values onFilter', async () => {
    const onFilter = jest.fn()
    renderSut({ onFilter })

    userEvent.click(screen.getByRole('radio', { name: /high to low/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /action/i }))

    userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith({ linux: true, sort_by: 'high-to-low', action: true })
    })
  })

  it('should return new selected and re-selected values onFilter', async () => {
    const onFilter = jest.fn()
    renderSut({ onFilter })

    userEvent.click(screen.getByRole('radio', { name: /high to low/i }))
    userEvent.click(screen.getByRole('radio', { name: /low to high/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))
    userEvent.click(screen.getByRole('checkbox', { name: /linux/i }))

    userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith({ linux: false, sort_by: 'low-to-high' })
    })
  })
})
