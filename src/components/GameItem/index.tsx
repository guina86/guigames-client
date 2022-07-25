/* eslint-disable @next/next/no-img-element */
import { Download } from '@styled-icons/boxicons-solid'
import { useCart } from 'hooks/use-cart'
import * as S from './styles'

export type PaymentInfoProps = {
  number: string
  flag: string
  img: string
  purchaseDate: string
}

export type GameItemProps = {
  id: string
  img: string
  title: string
  price: string
  downloadLink?: string
  paymentInfo?: PaymentInfoProps
}

const GameItem = ({ id, img, price, title, downloadLink, paymentInfo }: GameItemProps) => {
  const { isInCart, removeFromCart } = useCart()

  return (
    <S.Wrapper>
      <S.GameContent>
        <S.ImageBox>
          <img src={img} alt={title} />
        </S.ImageBox>

        <S.Content>
          <S.TitleContent>
            <S.Title>{title}</S.Title>
            {!!downloadLink && (
              <S.DownloadLink href={downloadLink} target="_blank" aria-label={`Get ${title} here`}>
                <Download size={22} />
              </S.DownloadLink>
            )}
          </S.TitleContent>
          <S.Group>
            <S.Price>{price}</S.Price>
            {isInCart(id) && <S.Remove onClick={() => removeFromCart(id)}>Remover</S.Remove>}
          </S.Group>
        </S.Content>
      </S.GameContent>

      {!!paymentInfo && (
        <S.PaymentContent>
          <div>{paymentInfo.purchaseDate}</div>
          <S.CardInfo>
            <span>{paymentInfo.number}</span>
            <img src={paymentInfo.img} alt={paymentInfo.flag} />
          </S.CardInfo>
        </S.PaymentContent>
      )}
    </S.Wrapper>
  )
}

export default GameItem
