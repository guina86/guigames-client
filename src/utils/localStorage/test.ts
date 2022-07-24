import { Windows } from '@styled-icons/fa-brands'
import { getStorageItem, setStorageItem } from '.'

describe('localStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('getStorageItem()', () => {
    it('should ', () => {
      window.localStorage.setItem('GUIGAMES_cartItems', JSON.stringify(['1', '2']))

      expect(getStorageItem('cartItems')).toStrictEqual(['1', '2'])
    })
  })

  describe('setStorageItem()', () => {
    it('should add the item to localStorage', () => {
      setStorageItem('cartItems', ['1', '2'])

      expect(window.localStorage.getItem('GUIGAMES_cartItems')).toStrictEqual(
        JSON.stringify(['1', '2'])
      )
    })
  })
})
