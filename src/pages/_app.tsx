import { AppProps } from "next/app"
import Image from "next/image"
import * as Dialog from '@radix-ui/react-dialog';
import { globalStyles } from "../styles/global"
import { Container, HandbagButton, Header, ItemsContainer, QuantityContainer, ShoppingBagContainer, TotalText, TotalValue } from "../styles/pages/app"

import logoImg from '../assets/logo.svg'
import { Handbag, X } from "phosphor-react"
import Link from "next/link";

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <HandbagButton title="Sacola de compras" hasItems>
              <Handbag size={24} />
              <span>1</span>
            </HandbagButton>
          </Dialog.Trigger>

          <Dialog.Portal>
            <ShoppingBagContainer>
              <Dialog.Close>
                <X size={24} />
              </Dialog.Close>
              <div>
                <Dialog.Title>Sacola de compras</Dialog.Title>

                <ItemsContainer>
                  {/* <span>A sacola está vazia</span> */}
                  <div>
                    <Image src="https://avatars.githubusercontent.com/u/18452687?v=4" width={94} height={94} alt="" />
                    <div>
                      <span>Camiseta Beyond the Limits</span>
                      <strong>R$ 79,90</strong>
                      <button>Remover</button>
                    </div>
                  </div>

                  <div>
                    <Image src="https://avatars.githubusercontent.com/u/18452687?v=4" width={94} height={94} alt="" />
                    <div>
                      <span>Camiseta Beyond the Limits</span>
                      <strong>R$ 79,90</strong>
                      <button>Remover</button>
                    </div>
                  </div>
                </ItemsContainer>

                <footer>
                  <QuantityContainer>
                    <span>Quantidade</span>
                    <span>3 items</span>
                  </QuantityContainer>
                  <div>
                    <TotalText>Valor total</TotalText>
                    <TotalValue>R$ 270,00</TotalValue>
                  </div>

                  <button>
                    Finalizar compra
                  </button>
                </footer>
              </div>
            </ShoppingBagContainer>
          </Dialog.Portal>
        </Dialog.Root>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

export default App
