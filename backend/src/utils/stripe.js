import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const configureStripe = (app) => {
  app.post("/create-checkout-session", async (req, res) => {
    try {
      const { orderItems, totalPrice } = req.body;

      // Use a single line item for the total order price (including shipping, tax, etc)
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
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/place-order`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: "Checkout session creation failed." });
    }
  });
};

export default configureStripe;
