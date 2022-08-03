import { render, screen } from 'utils/tests'
import userEvent from '@testing-library/user-event'
import { Email } from '@styled-icons/material-outlined'
import TextField, { TextFieldProps } from '.'

describe('<TextField />', () => {
  const renderSut = (props?: TextFieldProps) => render(<TextField {...props} />)

  it('should render with label', () => {
    renderSut({ label: 'Label', name: 'Label' })

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('should render without label', () => {
    renderSut()

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    renderSut({ placeholder: 'any_placeholder' })

    expect(screen.getByPlaceholderText('any_placeholder')).toBeInTheDocument()
  })

  it('should render with icon', () => {
    renderSut({ icon: <Email data-testid="icon" /> })

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render with icon on the right', () => {
    renderSut({ icon: <Email data-testid="icon" />, iconPosition: 'right' })

    expect(screen.getByTestId('input-wrapper')).toHaveStyle({
      flexDirection: 'row-reverse'
    })
  })

  it('should render a disabled TextField', () => {
    renderSut({ label: 'Label', name: 'Label', disabled: true })
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('should render with error message', () => {
    renderSut({
      label: 'Label',
      name: 'Label',
      icon: <Email data-testid="icon" />,
      error: 'any_error'
    })
    expect(screen.getByText('any_error')).toBeInTheDocument()
  })

  it('should change its value when typing', async () => {
    const onInputChange = jest.fn()
    renderSut({ onInputChange, label: 'TextField', name: 'TextField' })

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'
    await userEvent.type(input, text)

    expect(input).toHaveValue(text)

    expect(onInputChange).toHaveBeenCalledTimes(text.length)
    expect(onInputChange).toHaveBeenCalledWith(text)
  })

  it('should be accessible by tab', () => {
    renderSut({ label: 'TextField', name: 'TextField' })

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByRole('textbox')).toHaveFocus()
  })
})
