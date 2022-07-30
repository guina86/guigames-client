import { GetGames_games } from 'graphql/generated/GetGames'
import { GetHome_banners, GetHome_sections_newGames_highlight } from 'graphql/generated/GetHome'
import { GetWishlist_wishlists_games } from 'graphql/generated/GetWishlist'
import { GetOrders_orders } from 'graphql/generated/GetOrders'
import formatPrice from 'utils/format-price'
import { getImageUrl } from 'utils/getImageUrl'

export const bannerMapper = (banners: GetHome_banners[]) =>
  banners.map((banner) => ({
    img: getImageUrl(banner.image?.url!),
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

export const gamesMapper = (
  games: GetGames_games[] | GetWishlist_wishlists_games[] | null | undefined
) =>
  games
    ? games.map((game?) => ({
        id: game.id,
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: getImageUrl(game.cover?.url!),
        price: game.price
      }))
    : []

export const highlightMapper = (
  highlight: GetHome_sections_newGames_highlight | null | undefined
) =>
  highlight
    ? {
        title: highlight.title,
        subtitle: highlight.subtitle,
        backgroundImage: getImageUrl(highlight.background?.url!),
        floatImage: getImageUrl(highlight.floatImage?.url!),
        alignment: highlight.alignment,
        buttonLabel: highlight.buttonLabel,
        buttonLink: highlight.buttonLink
      }
    : {}

export const cartMapper = (games: GetGames_games[] | null | undefined) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        img: getImageUrl(game.cover?.url),
        price: formatPrice(game.price),
        title: game.name
      }))
    : []
}

export const ordersMapper = (orders: GetOrders_orders[] | null) => {
  return orders
    ? orders.map((order) => {
        return {
          id: order.id,
          paymentInfo: {
            flag: order.card_brand,
            img: order.card_brand ? `/img/cards/${order.card_brand}.png` : null,
            number: order.card_last4 ? `**** **** **** ${order.card_last4}` : 'Free Game',
            purchaseDate: `Purchase made on ${new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }).format(new Date(order.created_at))}`
          },
          games: order.games.map((game) => ({
            id: game.id,
            title: game.name,
            downloadLink: 'https://guigames.com/game/download/yuYT56Tgh43LkjhNBgdf',
            img: getImageUrl(game.cover?.url),
            price: formatPrice(game.price)
          }))
        }
      })
    : []
}
