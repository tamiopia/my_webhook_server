const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const handleWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Checkout session completed for session: ${session.id}`);
            // Handle the event (e.g., fulfill the purchase, update the database, etc.)
            break;
        // Handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('Received Stripe webhook');
};

module.exports = {
    handleWebhook
};
