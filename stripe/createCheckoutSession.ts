import getStripe from "./initializeStripe";
import { db } from "../src/utility/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export async function createCheckoutSession(uid: string) {
  const checkoutSessionRef = collection(db, "users", uid, "checkout_sessions");
  const newCheckoutSessionDoc = await addDoc(checkoutSessionRef, {
    price: "price_1L43OhE823uteDHEh8kdJC8q",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  onSnapshot(newCheckoutSessionDoc, async (snapshot) => {
    const { sessionId } = snapshot.data()!;
    if (sessionId) {
      const stripe = await getStripe();
      if (stripe) {
        console.log("Stripe initialized");
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
        if (error) {
          console.error(error);
        }
      }
    }
  });
}
