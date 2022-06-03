import { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../utility/firebase.config";
import { Account } from "../../components/AddAccountForm";
import { toast } from "react-toastify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    const { userId, accounts } = data

    const collectionRef = collection(db, "users", userId, "accounts");

    const accountsRef = await getDocs(collectionRef);

    // Don't add if account already exists
    accountsRef.docs.map((account) => {
      const compareAccount = {
        facebookId: account.data().facebookId,
        nickname: account.data().nickname,
      }
      const accountIndex = accounts.findIndex((acc: Account) => acc.facebookId === compareAccount.facebookId)
      if (accountIndex !== -1) {
        //remove duplicates
        accounts.splice(accountIndex, 1)
      } else {
        return false
      }
    })

    accounts.forEach(async (account: Account) => {
      await addDoc(collectionRef, account)
    })

    res.status(200).json(data)
  } catch (e: any) {
    toast.error('Erro ao adicionar contas')
    res.status(500).json({ error: e.message })
  }
}