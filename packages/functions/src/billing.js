import Stripe from "stripe";
import handler from "@notes/core/src/handler";
import { calculateCost } from "@notes/core/src/cost";

export const main = handler(async (event) => {
    // storage is the number of notes the user would like to store in his account. 
    // source is the Stripe token for the card that we are going to charge.
    
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load our secret key from the  environment variables
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd",
    });

    return { status: true };
});