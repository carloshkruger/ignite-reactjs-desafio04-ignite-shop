import Link from "next/link";
import { ImageContainer, ImageListContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";

interface SuccessProps {
  customerName: string
  products: {
    name: string,
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { items, clearBag } = useContext(ShoppingBagContext)

  useEffect(() => {
    if (items.length) {
      clearBag()
    }
  }, [items, clearBag])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImageListContainer>
          {products.map(product => (
            <ImageContainer key={product.name}>
              <Image
                src={product.imageUrl}
                width={120}
                height={110}
                alt=""
              />
            </ImageContainer>
          ))}
        </ImageListContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camiseta{products.length > 1 ? 's' : ''} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>

  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(lineItem => {
    const product = lineItem.price.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0]
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}