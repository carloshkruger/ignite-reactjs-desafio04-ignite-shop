import { AppProps } from "next/app"
import Image from "next/image"
import * as Dialog from '@radix-ui/react-dialog';
import { globalStyles } from "../styles/global"
import { Container, Header, ShoppingBagContainer } from "../styles/pages/app"

import logoImg from '../assets/logo.svg'
import { Handbag, X } from "phosphor-react"

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button title="Sacola de compras">
              <Handbag size={48} />
              <span>1</span>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <ShoppingBagContainer>
              <Dialog.Close>
                <X size={24} />
              </Dialog.Close>
              <div>
                <Dialog.Title>Sacola de compras</Dialog.Title>

                <div>

                </div>

                <footer>
                  <div>
                    <span>Quantidade</span>
                    <span>3 items</span>
                  </div>
                  <div>
                    <span><strong>Valor total</strong></span>
                    <span><strong>R$ 270,00</strong></span>
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
