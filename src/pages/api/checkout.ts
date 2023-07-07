import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const priceIds: string[] = req.body.priceIds

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  if (!priceIds?.length) {
    return res.status(400).json({ message: 'priceIds not informed.' })
  } 

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
    mode: 'payment',
    line_items: priceIds.map(item => ({
      price: item,
      quantity: 1
    }))
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}