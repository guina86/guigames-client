import Image from 'next/image'
import { Download } from '@styled-icons/boxicons-solid'
import { useCart } from 'hooks/use-cart'
import * as S from './styles'

export type PaymentInfoProps = {
  number: string
  flag: string | null
  img: string | null
  purchaseDate: string
}

export type GameItemProps = {
  id: string
  img: string
  title: string
  price: string
  downloadLink?: string
  paymentInfo?: PaymentInfoProps
  hasLink?: boolean
}

const GameItem = ({ id, img, price, title, downloadLink, paymentInfo, hasLink }: GameItemProps) => {
  const { isInCart, removeFromCart } = useCart()

  return (
    <S.Wrapper data-testid="game-item">
      <S.GameContent>
        <S.ImageBox>
          <Image src={img} alt={title} width={150} height={70} />
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
            {hasLink && isInCart(id) && (
              <S.Remove onClick={() => removeFromCart(id)}>Remove</S.Remove>
            )}
          </S.Group>
        </S.Content>
      </S.GameContent>

      {!!paymentInfo && (
        <S.PaymentContent>
          <div>{paymentInfo.purchaseDate}</div>
          <S.CardInfo>
            <span>{paymentInfo.number}</span>
            {!!paymentInfo.img && !!paymentInfo.flag && (
              <Image src={paymentInfo.img} alt={paymentInfo.flag} width={38} height={24} />
            )}
          </S.CardInfo>
        </S.PaymentContent>
      )}
    </S.Wrapper>
  )
}

export default GameItem
