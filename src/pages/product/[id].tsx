import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext } from "react"
import Head from "next/head"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ShoppingBagContext } from "../../contexts/ShoppingBagContext"
import { currencyFormatter } from "../../utils/currencyFormatter"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    formattedPrice: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addToBag } = useContext(ShoppingBagContext)

  async function handleAddToBag() {
    addToBag(product)
  }

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button onClick={handleAddToBag}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id
  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const defaultPrice = response.default_price as Stripe.Price
  const price = defaultPrice.unit_amount / 100

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    price,
    formattedPrice: currencyFormatter.format(price),
    description: response.description,
    defaultPriceId: defaultPrice.id
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 // 1 hour
  }
}