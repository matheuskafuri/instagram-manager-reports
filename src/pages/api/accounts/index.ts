import { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../utility/firebase.config";
import { Account } from "../../components/AddAccountForm";
import { toast } from "react-toastify";
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const { userId, accounts } = data

    const collectionRef = collection(db, "users", userId, "accounts");

    accounts.forEach(async (account: Account) => {
      await addDoc(collectionRef, account)
    })

    res.status(200).json(data)
  } catch(e: any) {
    toast.error('Erro ao adicionar contas')
    res.status(500).json({ error: e.message })
  }
}