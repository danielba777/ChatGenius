const User = require('../models/User')

const stripe = require('stripe')(process.env.STRIPE_SECRET)
const DOMAIN = "http://localhost:3000"
const timer = ms => new Promise(res => setTimeout(res, ms))

exports.createCheckout = async (req, res) => {
    const { priceId, sub } = req.body;

    try {
        let customerId;

        if (req.user.stripeCustomerId) {
            customerId = req.user.stripeCustomerId;
        } else {
            const newCustomer = await stripe.customers.create({ email: req.user.email });
            customerId = newCustomer.id;

            await User.findByIdAndUpdate(req.user._id, { customerId: customerId, sub: sub });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: priceId, quantity: 1 }],
            customer: customerId,
            success_url: `${DOMAIN}/`,
            cancel_url: `${DOMAIN}/`,
            metadata: { subscription: sub }
        });

        return res.status(200).json(session);
    } catch (err) {
        console.error("Error in createCheckout: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createPortal = async (req, res) => {
    const { customerId } = req.body

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${DOMAIN}/`
        })
        return res.status(200).json(portalSession)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ message: err.message })
    }
}

exports.createWebhook = async (req, res) => {

    const sig = req.headers["stripe-signature"];
    let event;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        console.log("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Received event:", event.type);

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const customer_id = event.data.object.customer;
                const subscription_status = event.data.object.metadata.subscription;
                console.log("Customer ID:", customer_id, "Subscription Status:", subscription_status);

                const user = await User.findOne({ customerId: customer_id });
                if (!user) {
                    console.log("No user found with this customer ID:", customer_id);
                    return res.status(404).send('User not found');
                }

                user.subscription = subscription_status;
                await user.save();
                break;
            }
            case 'payment_intent.succeeded': {
                try {
                    await timer(3000)
                    const customer_id = event.data.object.customer
                    console.log("payment intent success")
                    const customer = await stripe.customers.retrieve(customer_id)
                    const user = await User.find({ customerId: customer_id })
                    await user[0].save()
                } catch (err) {
                    return res.status(400).send(`Webhook Error: ${err.message}`)
                }

                break
            }
            case 'payment_intent.payment_failed': {
                try {
                    await timer(3000)
                    const customer_id = event.data.object.customer
                    console.log("payment intent failure")
                    const user = await User.find({ customerId: customer_id})
                    user[0].subscription = ""
                    await user[0].save()
                } catch (err) {
                    return res.status(400).send(`Webhook Error: ${err.message}`)
                }
            }
            case 'customer.subscription.deleted': {
                try {
                    console.log("customer sub deleted")
                    await timer(3000)
                    const customer_id = event.data.object.customer
                    const user = await User.find({ customerId: customer_id })
                    user[0].subscription = ""
                    await user[0].save()
                } catch (err) {
                    return res.status(400).send(`Webhook Error: ${err.message}`)
                }

                break
            }
            case 'customer.deleted': {
                try {
                    console.log("customer deleted")
                    const customer_id = event.data.object.customer
                    const user = await User.find({ customerId: customer_id })
                    user[0].customerId = ""
                    user[0].subscription = ""
                    await user[0].save()
                } catch (err) {
                    return res.status(400).send(`Webhook Error: ${err.message}`)
                }

                break
            }
            default: 
                // Unexpected event type
                return res.status(400).end()
        }
    } catch (err) {
        console.error("Error processing webhook:", err);
        return res.status(500).send(`Internal Server Error: ${err.message}`);
    }
    res.json({ received: true });
}