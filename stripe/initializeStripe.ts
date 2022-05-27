import { Stripe, loadStripe } from "@stripe/stripe-js";
import { config } from "./config";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(config.STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default initializeStripe;
