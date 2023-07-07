import { GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home"
import { stripe } from "../lib/stripe"
import Head from "next/head"
import { Handbag } from "phosphor-react"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

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
                <span>{product.price}</span>
              </div>
              <button title="Adicionar a sacola">
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

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const products = response.data.map(product => ({
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: currencyFormatter.format((product.default_price as Stripe.Price).unit_amount / 100)
  }))

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}