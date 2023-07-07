import { GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home"
import { stripe } from "../lib/stripe"
import Head from "next/head"
import { Handbag } from "phosphor-react"
import { MouseEvent, useContext } from "react"
import { ShoppingBagContext } from "../contexts/ShoppingBagContext"
import { currencyFormatter } from "../utils/currencyFormatter"

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number,
  formattedPrice: string
  defaultPriceId: string
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const { addToBag } = useContext(ShoppingBagContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  function handleAddProductToBag(event: MouseEvent<HTMLButtonElement>, product: Product) {
    event.preventDefault()
    addToBag(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Product key={product.id} href={`/product/${product.id}`} prefetch={false} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.formattedPrice}</span>
              </div>
              <button onClick={(e) => handleAddProductToBag(e, product)} title="Adicionar à sacola">
                <Handbag size={32} />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const defaultPrice = product.default_price as Stripe.Price
    const price = defaultPrice.unit_amount / 100

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
      formattedPrice: currencyFormatter.format(price),
      defaultPriceId: defaultPrice.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}