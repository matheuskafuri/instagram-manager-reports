import { NextApiRequest, NextApiResponse } from "next";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../utility/firebase.config";
import { toast } from "react-toastify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const { userId, account } = data;
    const collectionRef = collection(db, "users", userId, "accounts");
    const accountRef = doc(collectionRef, account.facebookId);
    await deleteDoc(accountRef);
    res.status(200).json(data);
  } catch (e: any) {
    toast.error("Erro ao remover contas");
    res.status(500).json({ error: e.message });
  }
};
