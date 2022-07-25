/* eslint-disable testing-library/no-node-access */
import 'match-media-mock'
import { render, screen } from 'utils/tests'
import userEvent from '@testing-library/user-event'
import Gallery from '.'
import galleryMock from './mock'

describe('<Gallery />', () => {
  const renderSut = () => render(<Gallery items={galleryMock.slice(0, 2)} />)

  it('should render the gallery', () => {
    renderSut()

    expect(screen.getByRole('button', { name: /thumb - gallery image 1/i })).toHaveAttribute(
      'src',
      galleryMock[0].src
    )
    expect(screen.getByRole('button', { name: /thumb - gallery image 2/i })).toHaveAttribute(
      'src',
      galleryMock[1].src
    )
  })

  it('should handle open modal', async () => {
    renderSut()

    const modal = screen.getByLabelText('modal')

    expect(modal).toHaveAttribute('aria-hidden', 'true')
    expect(modal).toHaveStyle({ opacity: 0, pointerEvents: 'none' })

    await userEvent.click(screen.getByRole('button', { name: /thumb - gallery image 1/i }))
    expect(modal).toHaveAttribute('aria-hidden', 'false')
    expect(modal).toHaveStyle({ opacity: 1 })
  })

  it('should open modal with selected image', async () => {
    renderSut()

    await userEvent.click(screen.getByRole('button', { name: /thumb - gallery image 2/i }))
    const img = await screen.findByRole('img', { name: /gallery image 2/i })
    expect(img.parentElement?.parentElement).toHaveClass('slick-active')
  })

  it('should handle close modal when overlay or button clicked', async () => {
    renderSut()

    const modal = screen.getByLabelText('modal')

    await userEvent.click(screen.getByRole('button', { name: /thumb - gallery image 1/i }))
    expect(modal).toHaveAttribute('aria-hidden', 'false')
    expect(modal).toHaveStyle({ opacity: 1 })

    await userEvent.click(screen.getByRole('button', { name: /close modal/i }))
    expect(modal).toHaveAttribute('aria-hidden', 'true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })

  it('should handle close modal when esc key is pressed', async () => {
    const { container } = renderSut()

    const modal = screen.getByLabelText('modal')

    await userEvent.click(screen.getByRole('button', { name: /thumb - gallery image 1/i }))

    await userEvent.keyboard('{escape}')

    expect(modal).toHaveAttribute('aria-hidden', 'true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })
})
