import { RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'
import Radio, { RadioProps } from '.'

describe('<Radio />', () => {
  const renderSut = (props?: RadioProps): RenderResult => renderWithTheme(<Radio {...props} />)

  it('should render with label (white)', () => {
    renderSut({ label: 'Radio', value: 'any_value' })

    const label = screen.getByText('Radio')
    expect(label).toBeInTheDocument()
    expect(label).toHaveStyle({ color: '#FAFAFA' })
  })

  it('should render with label (black)', () => {
    renderSut({ label: 'Radio', labelColor: 'black' })

    expect(screen.getByText('Radio')).toHaveStyle({ color: '#030517' })
  })

  it('should render without label', () => {
    renderSut()

    expect(screen.queryByLabelText('Radio')).not.toBeInTheDocument()
  })

  it('should dispatch onCheck when label status changes', async () => {
    const onCheck = jest.fn()
    renderSut({ label: 'Radio', onCheck, value: 'any_value' })

    expect(onCheck).not.toHaveBeenCalled()

    userEvent.click(screen.getByLabelText('Radio'))

    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })
    expect(onCheck).toHaveBeenCalledWith('any_value')
  })

  it('should be accessible with tab', async () => {
    renderSut({ label: 'Radio', value: 'Radio' })

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByLabelText('Radio')).toHaveFocus()
  })
})
