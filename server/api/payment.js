const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const router = require('express').Router();
const {
  Stock,
  Category
} = require('../db/models');
require('dotenv').config()
module.exports = router;

// Actual path: api/payment
router.post('/', async (req, res, next) => {
    const stocks = await Stock.findAll({
        include: [{ model: Category }]
    })
    const storeItems = stocks.map(item => {
        return {
            id: item.id,
            priceInCents: item.price * 100,
            name: item.name
        }
    })
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.find(i => i.id === item.id)
                return {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: storeItem.name,
                    },
                    unit_amount: storeItem.priceInCents
                  }, 
                  quantity: item.quantity
                }}),
            success_url: `${process.env.SERVER_URL}/thankyou`,
            cancel_url: `${process.env.SERVER_URL}/cart`
        })
        console.log('S', session)
        res.json({url: session.url})
    } catch (err) {
        next();
    }
});