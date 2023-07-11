import Stripe from "stripe";

const stripe = new Stripe("sk_test_51NSgA4SBqqSD6EP2N5G8y6YHt3SuaWZ6tjVxH5KJX59GD5e0Qik4BaxCABsQ5GddJIFZVtp0CV11FZqyLOqI5eHh0019C2ouza");

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                // payement_method_type: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1NShQGSBqqSD6EP2vjD2C4DF' },
                    { shipping_rate: 'shr_1NShOwSBqqSD6EP2OVnCQMFl' },

                ],
                line_items: req.body.map((item) => {
                    const img = item.imageRef.replace('image-', 'https://cdn.sanity.io/images/g80wq38r/production/').replace('-jpg','.jpg');
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data :{ 
                                name: `${item.name} ${item.size.width} X ${item.size.height}`,
                                images: [img],
                            },
                            unit_amount: item.total * 100,
                        },  
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
              }
          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create(params);
          res.status(200).json(session);
        } catch (err) {
          res.status(err.statusCode || 500).json(err.message);
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}