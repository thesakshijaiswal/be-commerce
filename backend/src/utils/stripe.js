import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import express from "express";
import Order from "../models/order.model.js";

const configureStripe = (app) => {
  app.post("/create-checkout-session", async (req, res) => {
    try {
      const { orderItems, totalPrice, orderId } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Order Payment",
                description: orderItems
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(", "),
              },
              unit_amount: Math.round(totalPrice * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${
          process.env.CLIENT_URL
        }/success?session_id=${"{CHECKOUT_SESSION_ID}"}&order_id=${orderId}`,
        cancel_url: `${process.env.CLIENT_URL}/order/${orderId}`,
        metadata: {
          orderId: orderId,
        },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: "Checkout session creation failed." });
    }
  });

  app.post(
    "/webhook/stripe",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const orderId = session.metadata.orderId;
        try {
          const order = await Order.findById(orderId);
          if (order) {
            order.paidAt = new Date();
            order.paymentResult = {
              id: session.id,
              status: "completed",
              updateTime: new Date().toISOString(),
              emailAddress: session.customer_email,
            };
            await order.save();
            console.log(`Order ${orderId} payment status updated via webhook`);
          }
        } catch (error) {
          console.error("Error updating order payment status:", error);
        }
      }

      res.json({ received: true });
    }
  );
};

export default configureStripe;
