import { auth } from "../src/utility/firebase.config";

export default async function isUserPremium(): Promise<boolean> {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  console.log(decodedToken);
  return decodedToken?.claims?.stripeRole ? true : false;
}
