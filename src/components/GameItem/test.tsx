import { render, screen } from 'utils/tests'
import GameItem, { GameItemProps } from '.'

const args = {
  img: 'https://source.unsplash.com/user/willianjusten/151x70',
  title: 'Red Dead Redemption 2',
  price: 'R$ 215,00'
}

describe('<GameItem />', () => {
  const renderSut = (props?: Partial<GameItemProps>) => render(<GameItem {...args} {...props} />)

  it('should render the heading', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: args.title })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: args.title })).toHaveAttribute('src', args.img)
    expect(screen.getByText('R$ 215,00')).toBeInTheDocument()
  })

  it('should render with download link', () => {
    renderSut({ downloadLink: 'https://link' })

    expect(screen.getByRole('link', { name: `Get ${args.title} here` })).toHaveAttribute(
      'href',
      'https://link'
    )
  })

  it('should render with payment info', () => {
    const paymentInfo = {
      flag: 'mastercard',
      img: '/img/cards/mastercard.png',
      number: '**** **** **** 1234',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
    }
    renderSut({ paymentInfo })

    expect(screen.getByRole('img', { name: paymentInfo.flag })).toHaveAttribute(
      'src',
      paymentInfo.img
    )
    expect(screen.getByText(paymentInfo.number)).toBeInTheDocument()
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument()
  })
})
