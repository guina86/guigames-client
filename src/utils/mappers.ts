import { GetGames_games } from 'graphql/generated/GetGames'
import { GetHome_banners, GetHome_sections_newGames_highlight } from 'graphql/generated/GetHome'

export const imageMapper = (url: string | null | undefined) =>
  url ? `http://localhost:1337${url}` : ''

export const bannerMapper = (banners: GetHome_banners[]) =>
  banners.map((banner) => ({
    img: imageMapper(banner.image?.url!),
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size
    })
  }))

export const gamesMapper = (games: GetGames_games[] | null | undefined) =>
  games &&
  games.map((game?) => ({
    title: game.name,
    slug: game.slug,
    developer: game.developers[0].name,
    img: imageMapper(game.cover?.url!),
    price: game.price
  }))

export const highlightMapper = (
  highlight: GetHome_sections_newGames_highlight | null | undefined
) =>
  highlight && {
    title: highlight.title,
    subtitle: highlight.subtitle,
    backgroundImage: imageMapper(highlight.background?.url!),
    floatImage: imageMapper(highlight.floatImage?.url!),
    alignment: highlight.alignment,
    buttonLabel: highlight.buttonLabel,
    buttonLink: highlight.buttonLink
  }
