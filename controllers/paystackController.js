const crypto = require('crypto');

const handleWebhook = (req, res) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;

    const hash = crypto.createHmac('sha512', secret)
                 .update(JSON.stringify(req.body))
                 .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
        return res.status(400).send('Webhook Error: Invalid signature');
    }

    const event = req.body;

    switch (event.event) {
        case 'charge.success':
            const data = event.data;
            console.log(`Charge successful for reference: ${data.reference}`);
            // Handle the event (e.g., fulfill the purchase, update the database, etc.)
            break;
        // Handle other event types
        default:
            console.log(`Unhandled event type ${event.event}`);
    }

    res.status(200).send('Received Paystack webhook');
};

module.exports = {
    handleWebhook
};
