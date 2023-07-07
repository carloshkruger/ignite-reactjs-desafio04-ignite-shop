import { useContext, useState } from "react";
import Image from "next/image"
import * as Dialog from '@radix-ui/react-dialog';
import { Handbag, X } from "phosphor-react"
import axios from "axios"

import { ShoppingBagContext } from "../contexts/ShoppingBagContext";

import {
  EmptyBagMessage,
  HandbagButton,
  ItemsContainer,
  QuantityContainer,
  ShoppingBagContainer,
  TotalText,
  TotalValue
} from "../styles/components/ShoppingBagPanel"
import { currencyFormatter } from "../utils/currencyFormatter";

export function ShoppingBagPanel() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { items, removeFromBag } = useContext(ShoppingBagContext)

  async function handleFinishOrder() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceIds: items.map(item => item.defaultPriceId)
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout.')
    }
  }

  const hasItems = !!items.length
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0)
  const formattedTotalPrice = currencyFormatter.format(totalPrice)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <HandbagButton title="Sacola de compras" hasItems={hasItems}>
          <Handbag size={24} />
          {hasItems && <span>{items.length}</span>}
        </HandbagButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <ShoppingBagContainer>
          <Dialog.Close>
            <X size={24} />
          </Dialog.Close>
          <div>
            <Dialog.Title>Sacola de compras</Dialog.Title>

            {
              hasItems ? (
                <>
                  <ItemsContainer>
                    {items.map(item => (
                      <div key={item.id}>
                        <Image src={item.imageUrl} width={94} height={94} alt="" />
                        <div>
                          <span>{item.name}</span>
                          <strong>{item.formattedPrice}</strong>
                          <button onClick={() => removeFromBag(item)}>Remover</button>
                        </div>
                      </div>
                    ))}
                  </ItemsContainer>
                  <footer>
                    <QuantityContainer>
                      <span>Quantidade</span>
                      <span>{items.length} items</span>
                    </QuantityContainer>
                    <div>
                      <TotalText>Valor total</TotalText>
                      <TotalValue>{formattedTotalPrice}</TotalValue>
                    </div>

                    <button disabled={isCreatingCheckoutSession} onClick={handleFinishOrder}>
                      Finalizar compra
                    </button>
                  </footer>
                </>
              ) : <EmptyBagMessage>A sacola está vazia</EmptyBagMessage>
            }
          </div>
        </ShoppingBagContainer>
      </Dialog.Portal>
    </Dialog.Root>
  )
}