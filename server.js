const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const stripeController = require('./controllers/stripeController');
const paystackController = require('./controllers/paystackController');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Webhook endpoints
app.post('/webhook/stripe', stripeController.handleWebhook);
app.post('/webhook/paystack', paystackController.handleWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
