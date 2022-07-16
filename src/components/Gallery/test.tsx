/* eslint-disable testing-library/no-node-access */
import 'match-media-mock'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Gallery from '.'
import galleryMock from './mock'

describe('<Gallery />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<Gallery items={galleryMock.slice(0, 2)} />)

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

  it('should handle open modal', () => {
    renderSut()

    const modal = screen.getByLabelText('modal')

    expect(modal).toHaveAttribute('aria-hidden', 'true')
    expect(modal).toHaveStyle({ opacity: 0, pointerEvents: 'none' })

    fireEvent.click(screen.getByRole('button', { name: /thumb - gallery image 1/i }))
    expect(modal).toHaveAttribute('aria-hidden', 'false')
    expect(modal).toHaveStyle({ opacity: 1 })
  })

  it('should open modal with selected image', async () => {
    renderSut()

    fireEvent.click(screen.getByRole('button', { name: /thumb - gallery image 2/i }))
    const img = await screen.findByRole('img', { name: /gallery image 2/i })
    expect(img.parentElement?.parentElement).toHaveClass('slick-active')
  })

  it('should handle close modal when overlay or button clicked', () => {
    renderSut()

    const modal = screen.getByLabelText('modal')

    fireEvent.click(screen.getByRole('button', { name: /thumb - gallery image 1/i }))
    expect(modal).toHaveAttribute('aria-hidden', 'false')
    expect(modal).toHaveStyle({ opacity: 1 })

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }))
    expect(modal).toHaveAttribute('aria-hidden', 'true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })

  it('should handle close modal when esc key is pressed', () => {
    const { container } = renderSut()

    const modal = screen.getByLabelText('modal')

    fireEvent.click(screen.getByRole('button', { name: /thumb - gallery image 1/i }))

    fireEvent.keyUp(container, { key: 'Escape' })
    expect(modal).toHaveAttribute('aria-hidden', 'true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })
})
