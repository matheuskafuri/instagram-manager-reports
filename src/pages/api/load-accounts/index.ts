import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utility/firebase.config";
import { Account } from "../../components/AddAccountForm";
import { toast } from "react-toastify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { userId } = req.body;
      const collectionRef = collection(db, "users", userId, "accounts");
      const accountsRef = await getDocs(collectionRef);
      const accounts: Account[] = accountsRef.docs.map((account) => {
        return {
          facebookId: account.data().facebookId,
          nickname: account.data().nickname,
        };
      });
      toast.success("Contas carregadas com sucesso");
      res.status(200).json(accounts);
    } catch (e: any) {
      toast.error("Erro ao buscar contas");
      res.status(500).json({ error: e.message });
    }
  }
};
