import { render, screen } from 'utils/tests'
import userEvent from '@testing-library/user-event'

import Checkbox, { CheckboxProps } from '.'

describe('<Checkbox />', () => {
  const renderSut = (props?: CheckboxProps) => render(<Checkbox {...props} />)

  it('should render with label', () => {
    renderSut({ label: 'checkbox label', name: 'check' })

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument()
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check')
  })

  it('should render with no label', () => {
    renderSut()

    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument()
  })

  it('should render with black label', () => {
    renderSut({ label: 'checkbox label', name: 'check', labelColor: 'black' })

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({ color: '#030517' })
  })

  it('should dispatch onCheck when label status changes', async () => {
    const onCheck = jest.fn()
    renderSut({ label: 'Checkbox', onCheck })

    expect(onCheck).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onCheck).toHaveBeenCalledTimes(1)
    expect(onCheck).toHaveBeenCalledWith(true)
  })

  it('should dispatch onCheck when label status changes', async () => {
    const onCheck = jest.fn()
    renderSut({ label: 'Checkbox', onCheck, isChecked: true })

    expect(onCheck).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onCheck).toHaveBeenCalledTimes(1)
    expect(onCheck).toHaveBeenCalledWith(false)
  })

  it('should dispatch onCheck when label status changes', async () => {
    renderSut({ label: 'Checkbox', name: 'Checkbox' })

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus()
  })
})
