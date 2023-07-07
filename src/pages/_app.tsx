import { AppProps } from "next/app"
import Image from "next/image"
import Link from "next/link";

import { ShoppingBagContextProvider } from "../contexts/ShoppingBagContext";
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"

import logoImg from '../assets/logo.svg'
import { ShoppingBagPanel } from "../components/ShoppingBagPanel";

globalStyles()

function App({ Component, pageProps }: AppProps) {


  return (
    <ShoppingBagContextProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>

          <ShoppingBagPanel />
        </Header>

        <Component {...pageProps} />
      </Container>
    </ShoppingBagContextProvider>
  )
}

export default App
