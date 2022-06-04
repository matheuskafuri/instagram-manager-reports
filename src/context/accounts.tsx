import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Account } from "../pages/components/AddAccountForm";
import fireBaseApi from "../services/fireBaseApi";
import { auth } from "../utility/firebase.config";

type AccountsContextData = {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  loadUserAccounts: () => void;
};

type AccountsContextProviderProps = {
  children: ReactNode;
};

const AccountsContext = createContext({} as AccountsContextData);

function AccountsContextProvider({ children }: AccountsContextProviderProps) {
  const [data, setData] = useState<Account[]>([] as Account[]);
  const [user] = useAuthState(auth);

  const setAccounts = useCallback((accounts: Account[]) => {
    setData(accounts);
  }, []);

  const loadUserAccounts = useCallback(async () => {
    try {
      const data = {
        userId: user?.uid,
      };
      const accounts = await fireBaseApi.post("/load-accounts", data);
      setAccounts(accounts.data);
    } catch (err) {
      console.log(err);
    }
  }, [setAccounts, user]);

  return (
    <AccountsContext.Provider
      value={{ accounts: data, setAccounts, loadUserAccounts }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

const useAccountsContext = () => {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error(
      "useAccountContext must be used within a AccountsContextProvider"
    );
  }

  return context;
};

export { AccountsContextProvider, useAccountsContext };
