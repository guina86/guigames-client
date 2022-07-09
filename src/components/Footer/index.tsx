import Heading from 'components/Heading'
import Logo from 'components/Logo'
import Link from 'next/link'
import * as S from './styles'

export type FooterProps = {
  contentTestId?: string
}

const Footer = ({ contentTestId }: FooterProps) => (
  <S.Wrapper>
    <Logo color="black" />
    <S.Content data-testid={contentTestId}>
      <S.Column>
        <Heading color="black" size="small" lineBottom lineColor="secondary">
          Contact
        </Heading>
        <a href="mailto:sac@guigames.com">sac@guigames.com</a>
      </S.Column>

      <S.Column>
        <Heading color="black" size="small" lineBottom lineColor="secondary">
          Follow us
        </Heading>
        <nav aria-label="social media">
          <a href="https://www.instagram.com/gui-games" target="_blank" rel="noopenner, noreferrer">
            Instagram
          </a>
          <a href="https://www.twitter.com/gui-games" target="_blank" rel="noopenner, noreferrer">
            Twitter
          </a>
          <a href="https://www.youtube.com/gui-games" target="_blank" rel="noopenner, noreferrer">
            Youtube
          </a>
          <a href="https://www.facebook.com/gui-games" target="_blank" rel="noopenner, noreferrer">
            Facebook
          </a>
        </nav>
      </S.Column>

      <S.Column>
        <Heading color="black" size="small" lineBottom lineColor="secondary">
          Links
        </Heading>
        <nav aria-labelledby="footer resources">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/games">
            <a>Store</a>
          </Link>
          <Link href="/search">
            <a>Buscar</a>
          </Link>
        </nav>
      </S.Column>

      <S.Column aria-labelledby="footer-contact">
        <Heading color="black" size="small" lineBottom lineColor="secondary">
          Location
        </Heading>
        <span>Lorem ipsum dolor sit.</span>
        <span>Lorem, ipsum.</span>
        <span>Lorem, ipsum dolor.</span>
      </S.Column>
    </S.Content>
    <S.Copyright>Gui Games 2022 © All rights reserved.</S.Copyright>
  </S.Wrapper>
)

export default Footer
