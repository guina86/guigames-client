import { GetGames_games } from 'graphql/generated/GetGames'
import { GetHome_banners, GetHome_sections_newGames_highlight } from 'graphql/generated/GetHome'
import { GetOrders_orders } from 'graphql/generated/GetOrders'
import {
  imageMapper,
  bannerMapper,
  gamesMapper,
  highlightMapper,
  cartMapper,
  ordersMapper
} from '.'

describe('imageMapper()', () => {
  it('should return a mapped url', () => {
    const url = '/file.ext'

    expect(imageMapper(url)).toEqual('http://localhost:1337/file.ext')
  })

  it('should return empty string if no image', () => {
    expect(imageMapper(null)).toEqual('')
  })
})

describe('bannerMapper()', () => {
  it('should return the right format when mapped', () => {
    const banners = [
      {
        image: { url: '/image.jpg' },
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        button: { label: 'button label', link: 'button link' },
        ribbon: {
          text: 'ribbon text',
          color: 'primary',
          size: 'normal'
        }
      },
      {
        image: { url: '/image2.jpg' },
        title: 'Banner 2 title',
        subtitle: 'Banner 2 subtitle',
        button: { label: 'button 2 label', link: 'button 2 link' }
      }
    ] as GetHome_banners[]

    expect(bannerMapper(banners)).toStrictEqual([
      {
        img: 'http://localhost:1337/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'normal'
      },
      {
        img: 'http://localhost:1337/image2.jpg',
        title: 'Banner 2 title',
        subtitle: 'Banner 2 subtitle',
        buttonLabel: 'button 2 label',
        buttonLink: 'button 2 link'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are not games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })
  it('should ', () => {
    const games = [
      {
        id: '1',
        name: 'Game name',
        slug: 'game-name',
        developers: [{ name: 'Game developer' }],
        cover: { url: '/img.jpg' },
        price: 215
      }
    ] as GetGames_games[]

    expect(gamesMapper(games)).toStrictEqual([
      {
        id: '1',
        title: 'Game name',
        slug: 'game-name',
        developer: 'Game developer',
        img: 'http://localhost:1337/img.jpg',
        price: 215
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return an empty object if there is no highlight', () => {
    expect(highlightMapper(null)).toStrictEqual({})
  })

  it('should ', () => {
    const highlight = {
      title: 'Highlight title',
      subtitle: 'Highlight subtitle',
      background: { url: '/background.jpg' },
      floatImage: { url: '/floatImage.jpg' },
      alignment: 'left',
      buttonLabel: 'button label',
      buttonLink: 'butotn link'
    } as GetHome_sections_newGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'Highlight title',
      subtitle: 'Highlight subtitle',
      backgroundImage: 'http://localhost:1337/background.jpg',
      floatImage: 'http://localhost:1337/floatImage.jpg',
      alignment: 'left',
      buttonLabel: 'button label',
      buttonLink: 'butotn link'
    })
  })
})

describe('cartMapper()', () => {
  it('should return an empty array if there is no games', () => {
    expect(cartMapper(null)).toStrictEqual([])
  })

  it('should ', () => {
    const cartGames = [
      {
        id: '1',
        name: 'Sample Game',
        slug: 'sample-game',
        price: 10.5,
        developers: [{ name: 'sample developer' }],
        cover: {
          url: '/sample-game.jpg'
        }
      }
    ] as GetGames_games[]

    expect(cartMapper(cartGames)).toStrictEqual([
      {
        id: '1',
        img: 'http://localhost:1337/sample-game.jpg',
        price: '$10.50',
        title: 'Sample Game'
      }
    ])
  })
})

describe('ordersMapper()', () => {
  it('should return an empty array if there are no orders', () => {
    expect(ordersMapper(null)).toStrictEqual([])
  })

  it('should return mapped items', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: 'visa',
        card_last4: '4242',
        created_at: '2022-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 10
          }
        ]
      }
    ] as GetOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: 'visa',
          img: '/img/cards/visa.png',
          number: '**** **** **** 4242',
          purchaseDate: 'Purchase made on Apr 14, 2022'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink: 'https://guigames.com/game/download/yuYT56Tgh43LkjhNBgdf',
            img: 'http://localhost:1337/image.jpg',
            price: '$10.00'
          }
        ]
      }
    ])
  })

  it('should return free game when its free', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: null,
        card_last4: null,
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 0
          }
        ]
      }
    ] as GetOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: null,
          img: null,
          number: 'Free Game',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink: 'https://guigames.com/game/download/yuYT56Tgh43LkjhNBgdf',
            img: 'http://localhost:1337/image.jpg',
            price: 'FREE'
          }
        ]
      }
    ])
  })
})
