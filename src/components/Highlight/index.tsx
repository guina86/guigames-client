import Image from 'next/image'
import Link from 'next/link'
import Button from 'components/Button'
import * as S from './styles'

export type HighlighProps = {
  title: string
  subtitle: string
  backgroundImage: string
  floatImage?: string
  alignment?: 'right' | 'left'
  buttonLabel: string
  buttonLink: string
  wrapperTestId?: string
}

const Highlight = ({
  title,
  subtitle,
  backgroundImage,
  floatImage,
  alignment = 'right',
  buttonLabel,
  buttonLink,
  wrapperTestId
}: HighlighProps) => (
  <S.Wrapper alignment={alignment} data-testid="highlight">
    <Image src={backgroundImage} alt={`background ${title}`} layout="fill" />
    {!!floatImage && <S.FloatImage src={floatImage} alt={title} />}
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      <Link href={buttonLink} passHref>
        <Button as="a">{buttonLabel}</Button>
      </Link>
    </S.Content>
  </S.Wrapper>
)

export default Highlight
