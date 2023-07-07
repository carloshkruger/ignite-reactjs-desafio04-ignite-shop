import { ReactNode, createContext, useEffect, useState } from "react";

interface BagItem {
  id: string
  name: string
  imageUrl: string
  price: number
  formattedPrice: string
  defaultPriceId: string
}

interface ShoppingBagContextType {
  items: BagItem[],
  addToBag: (item: BagItem) => void
  removeFromBag: (item: BagItem) => void
  clearBag: () => void
}

interface ShoppingBagContextProps {
  children: ReactNode
}

export const ShoppingBagContext = createContext({} as ShoppingBagContextType)

const SHOPPING_BAG_CACHE_KEY = '@IgniteShop:shoppingBag'

export function ShoppingBagContextProvider({ children }: ShoppingBagContextProps) {
  const [items, setItems] = useState<BagItem[]>([])

  useEffect(() => {
    const shoppingBagFromCache = localStorage.getItem(SHOPPING_BAG_CACHE_KEY)
    if (shoppingBagFromCache) {
      setItems(JSON.parse(shoppingBagFromCache));
    }
  }, [])

  useEffect(() => {
    if (items.length) {
      localStorage.setItem(SHOPPING_BAG_CACHE_KEY, JSON.stringify(items))
    }
  }, [items])

  function addToBag(bagItem: BagItem) {
    const itemAlreadyInBag = items.some(item => item.id === bagItem.id)
    if (!itemAlreadyInBag) {
      setItems(state => [...state, bagItem])
    }
  }

  function removeFromBag(bagItem: BagItem) {
    setItems(state => state.filter(item => item.id !== bagItem.id))
  }

  function clearBag() {
    setItems([])
    localStorage.removeItem(SHOPPING_BAG_CACHE_KEY)
  }

  return (
    <ShoppingBagContext.Provider
      value={{
        items,
        addToBag,
        removeFromBag,
        clearBag,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  )
}