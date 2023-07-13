// import Stripe from "stripe";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === "POST") {

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1NTHlzSBqqSD6EP2xUzDzoHv" }, { shipping_rate: "shr_1NTHn6SBqqSD6EP29dgpNPHi" },{ shipping_rate: "shr_1NTIDHSBqqSD6EP2wIqRGq9X" }],
        line_items: req.body.x.map((item) => {
          const img = item.imageRef.replace("image-", "https://cdn.sanity.io/images/g80wq38r/production/").replace("-jpg", ".jpg");
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: `${item.name} ${item.size.width} X ${item.size.height} QTY: ${item.quantity}`,
                images: [img],
              },
              unit_amount: 1*100,
            },
            quantity: 1,
          };
        }),
        // success_url: `${req.headers.origin}/user/payment/success?id={CHECKOUT_SESSION_ID}`,
        success_url: `${req.headers.origin}/user/payment/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/user/payment/cancelled/{CHECKOUT_SESSION_ID}`,
        customer_email: req.body.email
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
