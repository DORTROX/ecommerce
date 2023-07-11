const { loadStripe } = require("@stripe/stripe-js");

let stripePromise;

const getStripe = () => {
    // console.log(process.env.StripeSecrectKey)
    if(!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_StripePubKey)
    }
    return stripePromise;
}

export default getStripe;